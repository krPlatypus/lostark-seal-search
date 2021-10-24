$(function () {
    const tableBody = $('#tableTbody');
    const searchBtn = $('#searchBtn');
    const searchRow = $('#searchRow');

    searchBtn.off('click').on('click', function () {
        $('table[data-category]').closest('div.col').remove();
        for(let i = 1; i <= 5; i++){
            search(i, 1);
        }
    });

    function search(rowNum, page) {
        //console.log('search', rowNum, page);
        const item = readyItem(rowNum, page);
        //console.log('search', item);
        if (item) {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                var activeTab = tabs[0];
                var activeTabId = activeTab.id;
                chrome.tabs.sendMessage(activeTabId, item, response => {
                    if (chrome.runtime.lastError) return;
                    //console.log('response', response);
                    //console.log('response data', response.data);
                    createTable(item, response.data);
                });
            });
        }
        /*createTable(item, {
            "acc": [
                {
                    "name": "비틀린 시간의 목걸이",
                    "effects": {
                        "seal1": {
                            "name": "전문의",
                            "value": "3"
                        },
                        "seal2": {
                            "name": "각성",
                            "value": "3"
                        },
                        "debuff": {
                            "name": "공격속도 감소",
                            "value": "1"
                        },
                        "status1": {
                            "name": "치명",
                            "value": "404"
                        },
                        "status2": {
                            "name": "숙련",
                            "value": "419"
                        }
                    },
                    "quality": 69,
                    "price": 1,
                    "buyPrice": null,
                    "auctionPrice": 1
                },
                {
                    "name": "비틀린 시간의 목걸이",
                    "effects": {
                        "seal1": {
                            "name": "전문의",
                            "value": "2"
                        },
                        "seal2": {
                            "name": "각성",
                            "value": "3"
                        },
                        "debuff": {
                            "name": "방어력 감소",
                            "value": "2"
                        },
                        "status1": {
                            "name": "치명",
                            "value": "442"
                        },
                        "status2": {
                            "name": "특화",
                            "value": "378"
                        }
                    },
                    "quality": 67,
                    "price": 50,
                    "buyPrice": null,
                    "auctionPrice": 50
                },
                {
                    "name": "추락한 혼돈의 목걸이",
                    "effects": {
                        "seal1": {
                            "name": "중갑 착용",
                            "value": "3"
                        },
                        "seal2": {
                            "name": "각성",
                            "value": "3"
                        },
                        "debuff": {
                            "name": "공격력 감소",
                            "value": "1"
                        },
                        "status1": {
                            "name": "치명",
                            "value": "400"
                        },
                        "status2": {
                            "name": "신속",
                            "value": "397"
                        }
                    },
                    "quality": 58,
                    "price": 700,
                    "buyPrice": null,
                    "auctionPrice": 700
                },
                {
                    "name": "빛나는 구도자의 목걸이",
                    "effects": {
                        "seal1": {
                            "name": "예리한 둔기",
                            "value": "3"
                        },
                        "seal2": {
                            "name": "각성",
                            "value": "3"
                        },
                        "debuff": {
                            "name": "방어력 감소",
                            "value": "1"
                        },
                        "status1": {
                            "name": "치명",
                            "value": "442"
                        },
                        "status2": {
                            "name": "신속",
                            "value": "448"
                        }
                    },
                    "quality": 95,
                    "price": 800,
                    "buyPrice": null,
                    "auctionPrice": 800
                },
                {
                    "name": "비틀린 시간의 목걸이",
                    "effects": {
                        "seal1": {
                            "name": "기습의 대가",
                            "value": "3"
                        },
                        "seal2": {
                            "name": "각성",
                            "value": "3"
                        },
                        "debuff": {
                            "name": "이동속도 감소",
                            "value": "1"
                        },
                        "status1": {
                            "name": "치명",
                            "value": "373"
                        },
                        "status2": {
                            "name": "신속",
                            "value": "439"
                        }
                    },
                    "quality": 64,
                    "price": 10,
                    "buyPrice": 10,
                    "auctionPrice": 10
                },
                {
                    "name": "비틀린 시간의 목걸이",
                    "effects": {
                        "seal1": {
                            "name": "슈퍼 차지",
                            "value": "3"
                        },
                        "seal2": {
                            "name": "각성",
                            "value": "3"
                        },
                        "debuff": {
                            "name": "공격속도 감소",
                            "value": "2"
                        },
                        "status1": {
                            "name": "치명",
                            "value": "429"
                        },
                        "status2": {
                            "name": "특화",
                            "value": "347"
                        }
                    },
                    "quality": 50,
                    "price": 30,
                    "buyPrice": 30,
                    "auctionPrice": 10
                },
                {
                    "name": "추락한 혼돈의 목걸이",
                    "effects": {
                        "seal1": {
                            "name": "각성",
                            "value": "3"
                        },
                        "seal2": {
                            "name": "강령술",
                            "value": "3"
                        },
                        "debuff": {
                            "name": "공격력 감소",
                            "value": "2"
                        },
                        "status1": {
                            "name": "치명",
                            "value": "393"
                        },
                        "status2": {
                            "name": "특화",
                            "value": "443"
                        }
                    },
                    "quality": 74,
                    "price": 30,
                    "buyPrice": 30,
                    "auctionPrice": 10
                },
                {
                    "name": "빛나는 구도자의 목걸이",
                    "effects": {
                        "seal1": {
                            "name": "아드레날린",
                            "value": "2"
                        },
                        "seal2": {
                            "name": "각성",
                            "value": "3"
                        },
                        "debuff": {
                            "name": "공격속도 감소",
                            "value": "3"
                        },
                        "status1": {
                            "name": "치명",
                            "value": "443"
                        },
                        "status2": {
                            "name": "신속",
                            "value": "373"
                        }
                    },
                    "quality": 66,
                    "price": 40,
                    "buyPrice": 40,
                    "auctionPrice": 40
                },
                {
                    "name": "추락한 혼돈의 목걸이",
                    "effects": {
                        "seal1": {
                            "name": "중갑 착용",
                            "value": "2"
                        },
                        "seal2": {
                            "name": "각성",
                            "value": "3"
                        },
                        "debuff": {
                            "name": "이동속도 감소",
                            "value": "1"
                        },
                        "status1": {
                            "name": "치명",
                            "value": "432"
                        },
                        "status2": {
                            "name": "특화",
                            "value": "408"
                        }
                    },
                    "quality": 75,
                    "price": 50,
                    "buyPrice": 50,
                    "auctionPrice": 50
                },
                {
                    "name": "비틀린 시간의 목걸이",
                    "effects": {
                        "seal1": {
                            "name": "예리한 둔기",
                            "value": "2"
                        },
                        "seal2": {
                            "name": "각성",
                            "value": "3"
                        },
                        "debuff": {
                            "name": "이동속도 감소",
                            "value": "3"
                        },
                        "status1": {
                            "name": "치명",
                            "value": "369"
                        },
                        "status2": {
                            "name": "특화",
                            "value": "445"
                        }
                    },
                    "quality": 65,
                    "price": 50,
                    "buyPrice": 50,
                    "auctionPrice": 50
                }
            ],
            "pagination": "\n        <div class=\"card-footer py-4\">\n            <nav aria-label=\"...\">\n                <ul class=\"pagination justify-content-end mb-0\">\n                    <li class=\"page-item disabled\">\n                    <a class=\"page-link\" href=\"#\" tabindex=\"-1\">\n                      <i class=\"fas fa-angle-left\"></i>\n                      <span class=\"sr-only\">이전</span>\n                    </a>\n                    </li>\n                    \n                        <li class=\"page-item active\">\n                            <a class=\"page-link\" href=\"javascript:void(0)\">1</a>\n                        </li>\n                       \n                        <li class=\"page-item \">\n                            <a class=\"page-link\" href=\"javascript:void(0)\">2</a>\n                        </li>\n                       \n                        <li class=\"page-item \">\n                            <a class=\"page-link\" href=\"javascript:void(0)\">3</a>\n                        </li>\n                       \n                        <li class=\"page-item \">\n                            <a class=\"page-link\" href=\"javascript:void(0)\">4</a>\n                        </li>\n                       \n                        <li class=\"page-item \">\n                            <a class=\"page-link\" href=\"javascript:void(0)\">5</a>\n                        </li>\n                       \n                        <li class=\"page-item \">\n                            <a class=\"page-link\" href=\"javascript:void(0)\">6</a>\n                        </li>\n                       \n                        <li class=\"page-item \">\n                            <a class=\"page-link\" href=\"javascript:void(0)\">7</a>\n                        </li>\n                       \n                        <li class=\"page-item \">\n                            <a class=\"page-link\" href=\"javascript:void(0)\">8</a>\n                        </li>\n                       \n                        <li class=\"page-item \">\n                            <a class=\"page-link\" href=\"javascript:void(0)\">9</a>\n                        </li>\n                       \n                        <li class=\"page-item \">\n                            <a class=\"page-link\" href=\"javascript:void(0)\">10</a>\n                        </li>\n                       \n                    <li class=\"page-item\">\n                        <a class=\"page-link\" href=\"#\">\n                          <i class=\"fas fa-angle-right\"></i>\n                          <span class=\"sr-only\">다음</span>\n                        </a>\n                    </li>\n                </ul>\n            </nav>\n        </div>\n    "
        });*/
    }

    function findSealSet(tds) {
        let seals = tds.find('select.number');
        let sealList = [];
        seals.each((i, v) => {
            const index = $(v).closest('td').index();
            const min = Number($(v).val());
            const seal = tableBody.closest('table').find(`thead th:eq(${index})`).text();
            if (min === 0 || seal.indexOf('각인') >= 0) {
                return true;
            }
            sealList.push({
                name: seal,
                min: min
            });
        });

        let sealSet = {};
        if (sealList.length > 0) {
            sealSet.seal1 = {};
            sealSet.seal1.name = sealList[0].name;
            sealSet.seal1.min = sealList[0].min;
        }
        if (sealList.length > 1) {
            sealSet.seal2 = {};
            sealSet.seal2.name = sealList[1].name;
            sealSet.seal2.min = sealList[1].min;
        }
        return sealSet;
    }

    function readyItem(rowNum = 1, page = 1) {
        console.log('readyItem', rowNum, page);
        const tr = tableBody.find(`tr:nth-child(${rowNum})`);
        const tds = tr.find('td');
        let item = {
            name: tr.find('[data-category]').text(),
            category: Number(tr.find('[data-category]').attr('data-category')),
            grade: Number(tds.find('select.grade').val()),
            quality: Number(tds.find('input[type="number"]').val()),
            dealOption1: {
                type: Number(tds.find('select.status:eq(0)').val()),
            },
            page: page
        };
        const dealOption2 = tds.find('select.status:eq(1)').val();
        if (dealOption2) {
            item = {
                ...item, ...{
                    dealOption2: {
                        type: Number(tds.find('select.status:eq(1)').val()),
                    },
                }
            };
        }

        item = {...item, ...findSealSet(tds)};
        if (!item.seal1) {
            //alert('각인을 설정해주세요');
            return null;
        }
        return createItemForm(item);
    }

    function createItemForm(item) {
        let itemForm = {
            name: item.name,
            category: item.category,
            grade: item.grade,
            quality: item.quality,
            dealOption1: item.dealOption1 && {
                type: item.dealOption1.type,
                min: 0,
            },
            imprintOption1: {
                type: imprintOption[item.seal1.name],
                min: item.seal1.min,
            },
            page: item.page
        }
        if (item.dealOption2) {
            itemForm = {
                ...itemForm, ...{
                    dealOption2: item.dealOption2 && {
                        type: item.dealOption2.type,
                        min: 0,
                    },
                }
            }
        }
        if (item.seal2) {
            itemForm = {
                ...itemForm, ...{
                    imprintOption2: {
                        type: imprintOption[item.seal2.name],
                        min: item.seal2.min,
                    }
                }
            }
        }
        return itemForm;
    }

    function createTable(item, data) {
        const itemName = item.name;
        let rowNum = 1;
        $('#tableTbody').find('tr td:first-child').each((i, v) => {
            const td = $(v);
            if(td.text() === itemName){
                rowNum = Number(td.closest('tr').index()) + 1;
                return false;
            }
        });

        let col = $('<div class="col"/>')
        let hasCol = false;
        const exists = $(`[data-rowNum="${rowNum}"]`);
        if(exists.length > 0){
            col = exists.closest('div.col');
            hasCol = true;
        }
        console.log('exists', exists);
        console.log('col', col);
        console.log('hasCol', hasCol);
        let html = `
            <div class="card">
                <!-- Card header -->
                <div class="card-header border-0">
                    <h3 class="mb-0" data-rowNum="${rowNum}">${item.name}</h3>
                </div>
                <!-- Light table -->
                <div class="table-responsive">
                    <table class="table align-items-center table-flush" data-category="${item.category}">
                        <thead class="thead-light">
                        <tr>
                            <th scope="col" style="width:50px">이름</th>
                            <th scope="col" style="width:55px">각인1</th>
                            <th scope="col" style="width:85px">각인2</th>
                            <th scope="col" style="width:85px;color: red">디버프</th>
                            <th scope="col" style="width:85px">특성1</th>
                            <th scope="col" style="width:85px">특성2</th>
                            <th scope="col" style="width:85px">경매가</th>
                            <th scope="col" style="width:85px">즉구가</th>
                            <th scope="col" style="width:55px">품질</th>
                        </tr>
                        </thead>
                        <tbody class="list">
                            ${data.acc.map((a, i) => {
                                return `
                                    <tr>
                                        <td>${a.name}</td>
                                        <td>${a.effects.seal1.name ? `${a.effects.seal1.name} +${a.effects.seal1.value}` : '-'}</td>
                                        <td>${a.effects.seal2.name ? `${a.effects.seal2.name} +${a.effects.seal2.value}` : '-'}</td>
                                        <td style="color: red">${a.effects.debuff.name ? `${a.effects.debuff.name} +${a.effects.debuff.value}` : '-'}</td>
                                        <td>${a.effects.status1.name ? `${a.effects.status1.name} +${a.effects.status1.value}` : '-'}</td>
                                        <td>${a.effects.status2.name ? `${a.effects.status2.name} +${a.effects.status2.value}` : '-'}</td>
                                        <td>${a.auctionPrice}</td>
                                        <td>${a.buyPrice ? a.buyPrice : '-'}</td>
                                        <td>${a.quality}</td>
                                    </tr>
                                `;
                            }).join('')}
                            <tr></tr>
                        </tbody>
                    </table>
                </div>
                ${data.pagination}
            </div>
        `;
        col.html(html);
        if(!hasCol){
            searchRow.append(col);
        }
        addListeners();
    }

    function addListeners(){
        searchRow.find('ul.pagination li.page-item').off('click').on('click', function (){
            const itemName = $(this).closest('div.card').find('.card-header h3').text();
            let rowNum = 1;
            $('#tableTbody').find('tr td:first-child').each((i, v) => {
                const td = $(v);
                if(td.text() === itemName){
                    rowNum = Number(td.closest('tr').index()) + 1;
                    return false;
                }
            });
            const page = Number($(this).text().trim());
            if(page && !isNaN(page)){
                search(rowNum, page);
            }
        });

        searchRow.find('table tbody tr').off('click').on('click', function (){
            const background = $(this).hasClass('clicked');
            if (background) {
                $(this).removeClass('clicked');
            } else {
                $(this).closest('tbody').find('tr').removeClass('clicked');
                $(this).addClass('clicked');
            }
            const itemName = $(this).closest('div.card').find('.card-header h3').text();
            let target;
            $('#tableTbody').find('tr td:first-child').each((i, v) => {
                const td = $(v);
                if(td.text() === itemName){
                    target = td.closest('tr');
                    return false;
                }
            });
            //console.log(target);
            if(target){
                // 디버프 클릭한걸로
                const clickedDebuff = $(this).children('td:nth-child(4)').text().replace(/\s/g, '');
                //console.log(clickedDebuff, target.find('select.debuff'));
                target.find('select.debuff option').filter(function() {
                    return $(this).text() === clickedDebuff;
                }).prop('selected', true);
                target.find('select.debuff').change();

                // 특성
                const clickedStatus1 = $(this).children('td:nth-child(5)').text().split('+')[0].trim();
                const clickedStatus2 = $(this).children('td:nth-child(6)').text().split('+')[0].trim();
                //console.log(clickedStatus1, dealOption[clickedStatus1], target.find('select.status:eq(0)'));
                target.find('select.status:eq(0)').val(dealOption[clickedStatus1]);
                target.find('select.status:eq(1)').val(dealOption[clickedStatus2]);
            }

        });

    }
})