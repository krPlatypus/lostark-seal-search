chrome.runtime.onMessage.addListener((form, sender, sendResponse) => {
    console.log('수신', form);

    const body = new URLSearchParams();

    body.append("request[firstCategory]", 200000);
    body.append("request[secondCategory]", form.category);
    body.append("request[itemGrade]", form.grade);
    body.append("request[itemLevelMin]", 0);
    body.append("request[itemLevelMax]", 1700);
    body.append("request[gradeQuality]", form.quality);
    body.append("request[etcOptionList][0][firstOption]", 2);
    body.append(
            "request[etcOptionList][0][secondOption]",
            form.dealOption1?.type ?? ""
    );
    body.append(
            "request[etcOptionList][0][minValue]",
            form.dealOption1?.min ?? ""
    );
    body.append("request[etcOptionList][0][maxValue]", "");
    body.append("request[etcOptionList][1][firstOption]", 2);
    body.append(
            "request[etcOptionList][1][secondOption]",
            form.dealOption2?.type ?? ""
    );
    body.append(
            "request[etcOptionList][1][minValue]",
            form.dealOption2?.min ?? ""
    );
    body.append("request[etcOptionList][1][maxValue]", "");
    body.append("request[etcOptionList][2][firstOption]", 3);
    body.append(
            "request[etcOptionList][2][secondOption]",
            form.imprintOption1?.type ?? ""
    );
    body.append(
            "request[etcOptionList][2][minValue]",
            form.imprintOption1?.min ?? ""
    );
    body.append("request[etcOptionList][2][maxValue]", "");
    body.append("request[etcOptionList][3][firstOption]", 3);
    body.append(
            "request[etcOptionList][3][secondOption]",
            form.imprintOption2?.type ?? ""
    );
    body.append(
            "request[etcOptionList][3][minValue]",
            form.imprintOption2?.min ?? ""
    );
    body.append("request[etcOptionList][3][maxValue]", "");
    body.append("request[pageNo]", form.page);
    body.append("request[sortOption][Sort]", "BUY_PRICE");
    body.append("request[sortOption][IsDesc]", false);

    sendFetch(body, sendResponse);
    return true;
    //sendResponse({bar: 2});
});

async function sendFetch(body, sendResponse){
    const data = await fetchData(body);
    sendResponse({data});
}

async function fetchData(body){
    return fetch("https://lostark.game.onstove.com/Auction/GetAuctionListV2", {
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: body,
        method: "POST",
    })
            .then((res) => res.text())
            .then((html) => {
                const parser = new DOMParser();
                //sendResponse(parser.parseFromString(html, "text/html"));
                return parser.parseFromString(html, "text/html");
            })
            .then((document) => {
                console.log('document', document);
                if (document.querySelector("#idLogin")) {
                    console.log('로그인이 필요합니다. 스크립트를 종료합니다.');
                    //sendResponse(new Error('ERR_NO_LOGIN'));
                    throw new Error('ERR_NO_LOGIN');
                }
                if (document.querySelector("#auctionListTbody > tr.empty")) {
                    if (document.querySelector("#auctionListTbody > tr.empty").innerText.trim() === "경매장 연속 검색으로 인해 검색 이용이 최대 5분간 제한되었습니다.") {
                        //sendResponse('ERR_LIMIT_REACHED');
                        return 'ERR_LIMIT_REACHED';
                    }
                    //sendResponse([]);
                    return [];
                }
                const acc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        .map((index) => parse(document, index))
                        .filter((x) => !!x);
                return {acc, pagination: parsePagination(document.querySelector(`div.pagination`))};
            });
}

function parse(document, index) {
    const row = document.querySelector(
            `#auctionListTbody > tr:nth-child(${index})`
    );
    if (!row) {
        return;
    }

    const name = row
            .querySelector(`td:nth-child(1) > div.grade > span.name`)
            .innerText.trim();
    /*const effects = Object.fromEntries(
            row
                    .querySelector(`td:nth-child(1) > div.effect`)
                    .innerText.trim()
                    .split("\n")
                    .map((str) => str.trim())
                    .filter((str) => !!str)
                    .map((str) => [
                        str.split("[")[1].split("]")[0],
                        parseInt(str.split("+")[1], 10),
                    ])
    );*/
    const seal1 = {
        name: row.querySelector('ul:nth-child(1) li:nth-child(1) font:nth-child(1)').innerText.trim().replace(/[\[\]']+/g,''),
        value:  row.querySelector('ul:nth-child(1) li:nth-child(1) font:nth-child(2)').innerText.trim().replace(/\+/g, ''),
    };
    const seal2 = {
        name:  row.querySelector('ul:nth-child(1) li:nth-child(2) font:nth-child(1)').innerText.trim().replace(/[\[\]']+/g,''),
        value:  row.querySelector('ul:nth-child(1) li:nth-child(2) font:nth-child(2)').innerText.trim().replace(/\+/g, ''),
    }
    const debuff = {
        name:  row.querySelector('ul:nth-child(1) li:nth-child(3) font:nth-child(1)').innerText.trim().replace(/[\[\]']+/g,''),
        value:  row.querySelector('ul:nth-child(1) li:nth-child(3) font:nth-child(2)').innerText.trim().replace(/\+/g, ''),
    }
    const status1 = {
        name:  row.querySelector('ul:nth-child(2) li:nth-child(1) font:nth-child(1)').innerText.trim().replace(/[\[\]']+/g,''),
        value:  row.querySelector('ul:nth-child(2) li:nth-child(1) font:nth-child(2)').innerText.trim().replace(/\+/g, ''),
    }
    const status2 = {
        name:  row.querySelector('ul:nth-child(2) li:nth-child(2) font:nth-child(1)').innerText.trim().replace(/[\[\]']+/g,''),
        value:  row.querySelector('ul:nth-child(2) li:nth-child(2) font:nth-child(2)').innerText.trim().replace(/\+/g, ''),
    }
    const effects = {seal1, seal2, debuff, status1, status2};

    const quality = parseInt(
            row.querySelector(`td:nth-child(3) > div > span.txt`).innerText.trim(),
            10
    );
    const buyPrice = parseFloat(
            row
                    .querySelector(`td:nth-child(6) > div > em`)
                    .innerText.trim()
                    .replace(/,/g, "")
    )
    const auctionPrice = parseFloat(
            row
                    .querySelector(`td:nth-child(5) > div > em`)
                    .innerText.trim()
                    .replace(/,/g, "")
    );
    const price = buyPrice || auctionPrice;

    return {
        name,
        effects,
        quality,
        price,
        buyPrice,
        auctionPrice,
    };
}

function parsePagination(pagination){
    const pages = Array.from(pagination.querySelectorAll('.pagination__number'));
    return `
        <div class="card-footer py-4">
            <nav aria-label="...">
                <ul class="pagination justify-content-end mb-0">
                    <li class="page-item prev">
                        <a class="page-link" href="#" tabindex="-1">
                          <i class="fas fa-angle-left"></i>
                          <span class="sr-only">이전</span>
                        </a>
                    </li>
                    ${pages.map((v, i) => {
                        const isActive = v.classList.contains('pagination__number--active');
                       return `
                        <li class="page-item ${isActive ? 'active' : ''}">
                            <a class="page-link" href="javascript:void(0)">${v.innerText}</a>
                        </li>
                       `; 
                    }).join('')}
                    <li class="page-item next">
                        <a class="page-link" href="#">
                          <i class="fas fa-angle-right"></i>
                          <span class="sr-only">다음</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    `;
}