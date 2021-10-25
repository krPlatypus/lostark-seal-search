const category = {
    목걸이: 200010,
    귀걸이: 200020,
    반지: 200030,
};

const dealOption = {
    "치명": 15,
    "특화": 16,
    "제압": 17,
    "신속": 18,
    "인내": 19,
    "숙련": 20,
};

const grade = {
    "전설": 4,
    "유물": 5,
    "고대": 6,
};

const imprintOption = {
    "각성": 255,
    "갈증": 286,
    "강령술": 243,
    "강화 무기": 129,
    "강화 방패": 242,
    "결투의 대가": 288,
    "고독한 기사": 225,
    "광기": 125,
    "광전사의 비기": 188,
    "구슬동자": 134,
    "굳은 의지": 123,
    "극의: 체술": 190,
    "급소 타격": 142,
    "기습의 대가": 249,
    "긴급구조": 302,
    "넘치는 교감": 199,
    "달의 소리": 287,
    "달인의 저력": 238,
    "돌격대장": 254,
    "두 번째 동료": 258,
    "마나 효율 증가": 168,
    "마나의 흐름": 251,
    "멈출 수 없는 충동": 281,
    "바리케이드": 253,
    "버스트": 279,
    "번개의 분노": 246,
    "부러진 뼈": 245,
    "분노의 망치": 196,
    "분쇄의 주먹": 236,
    "불굴": 235,
    "사냥의 시간": 290,
    "상급 소환사": 198,
    "선수필승": 244,
    "세맥타통": 256,
    "속전속결": 300,
    "슈퍼 차지": 121,
    "승부사": 248,
    "시선 집중": 298,
    "실드 관통": 237,
    "심판자": 282,
    "아드레날린": 299,
    "아르데타인의 기술": 284,
    "안정된 상태": 111,
    "약자 무시": 107,
    "에테르 포식자": 110,
    "여신의 가호": 239,
    "역천지체": 257,
    "예리한 둔기": 141,
    "오의 강화": 127,
    "오의난무": 292,
    "완벽한 억제": 280,
    "원한": 118,
    "위기 모면": 140,
    "일격필살": 291,
    "잔재된 기운": 278,
    "저주받은 인형": 247,
    "전문의": 301,
    "전투 태세": 224,
    "절실한 구원": 195,
    "절정": 276,
    "절제": 277,
    "점화": 293,
    "정기 흡수": 109,
    "정밀 단도": 303,
    "죽음의 습격": 259,
    "중갑 착용": 240,
    "중력 수련": 197,
    "진실된 용맹": 194,
    "진화의 유산": 285,
    "질량 증가": 295,
    "초심": 189,
    "최대 마나 증가": 167,
    "추진력": 296,
    "축복의 오라": 283,
    "충격 단련": 191,
    "타격의 대가": 297,
    "탈출의 명수": 202,
    "포격 강화": 193,
    "폭발물 전문가": 241,
    "피스메이커": 289,
    "핸드거너": 192,
    "화력 강화": 130,
    "환류": 294,
    "황제의 칙령": 201,
    "황후의 은총": 200,
};

$(function () {
    const tbody = $('#tableTbody');
    //const rows = ['목걸이', '귀걸이1', '귀걸이2', '반지1', '반지2', '각인1', '각인2', '돌'];
    const rows = [{title: '목걸이', code: category.목걸이}, {title: '귀걸이1', code: category.귀걸이}, {
        title: '귀걸이2',
        code: category.귀걸이
    }, {title: '반지1', code: category.반지}, {
        title: '반지2',
        code: category.반지2
    }, {title: '각인1'}, {title: '각인2'}, {title: '돌'},]
    // 지역 변수 라인
    const numberOptions = `
        <option value="0">0</option>
        <option value="1">+1</option>
        <option value="2">+2</option>
        <option value="3">+3</option>
        <option value="4">+4</option>
        <option value="5">+5</option>
        <option value="6">+6</option>
    `;
    const seals = {
        damage: '공격력감소',
        attackspeed: '공격속도감소',
        defense: '방어력감소',
        speed: '이동속도감소'
    };
    const sealsCount = 3;

    //---------------------------------------------------------------------

    function createRow(item) {
        return `
                    <td ${item.code ? `data-category="${item.code}"` : ``}>${item.title}</td>
                    <td><select class="number"></select></td>
                    <td><select class="number"></select></td>
                    <td><select class="number"></select></td>
                    <td><select class="number"></select></td>
                    <td><select class="number"></select></td>
                    <td><select class="number"></select></td>
                    <td><select class="debuff"></select></td>
                    <td><select class="status"></select></td>
                    <td><select class="status"></select></td>
                    <td><select class="grade"></select></td>
                    <td><input type="number" min="0" max="100" value="50" style="width: 40px"/></td>
                    <td></td>
                `;
    }

    // rows 추가
    rows.forEach((item, i) => {
        const tr = $('<tr></tr>');
        tr.append(createRow(item));
        if (item.title.indexOf('각인') >= 0) {
            tr.find('input').remove();
        }
        if (item.title.indexOf('돌') >= 0) {
            tr.find('input').remove();
        }
        if (item.title.indexOf('목걸이') < 0) {
            tr.find('td:eq(9) select').remove();
            if (!(item.title.indexOf('귀걸이') >= 0 || item.title.indexOf('반지') >= 0)) {
                tr.find('td:eq(8) select').remove();
            }
        }

        tbody.append(tr);
    });

    //합계 추가
    tbody.append(`
                    <tr>
                        <td>총합</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>
                            <div class="row total debuff">
                                <div class="col" data-seal="damage">공<span>0</span></div>
                                <div class="col" data-seal="attackspeed">공속<span>0</span></div>
                                <div class="col" data-seal="defense">방<span>0</span></div>
                                <div class="col" data-seal="speed">이속<span>0</span></div>                            
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                `);

    // 각인 select 추가
    $('select.number').each((i, v) => {
        for(let i = 0; i <= 6; i++){
            $(v).append(`<option value="${i}">${i > 0 ? '+' : ''}${i}</option>`);
        }
        const head = $(v).closest('tr').find('td:nth-child(1)').text();
        console.log(head);
        if(head.indexOf('각인') >= 0 || head.indexOf('돌') >= 0){
            for(let i = 6; i <= 12; i++){
                $(v).append(`<option value="${i}">${i > 0 ? '+' : ''}${i}</option>`);
            }
        }
        //$(v).append(numberOptions);
    });

    // 디버프 select 추가
    $('select.debuff').append('<option></option>');
    for (const [key, value] of Object.entries(seals)) {
        for (let i = 1; i <= sealsCount; i++) {
            const option = `<option value="${i}" data-seal="${key}">${value}+${i}</option>`;
            $('select.debuff').append(option);
        }
    }

    // 디버프 계산
    $('select.debuff').off('change').on('change', function () {
        $('.total.debuff div span').text('0');
        $('.total.debuff div span').css({
            'color': 'blue'
        });
        $('select.debuff').each((i, select) => {
            const opt = $(select).find('option:selected');
            const seal = opt.attr('data-seal');
            const value = Number(opt.val());
            const target = $(`.total.debuff div.col[data-seal="${seal}"] span`);
            target.text(Number(target.text()) + value);
        });
        $('.total.debuff div span').each((i, target) => {
            target = $(target);
            if (Number(target.text()) >= 5) {
                target.css({
                    'color': 'red'
                });
            } else {
                target.css({
                    'color': 'blue'
                });
            }
        });
    });

    // 각인 계산
    $('select.number').off('change').on('change', function () {
        const index = $(this).closest('td').index();
        const nth = index + 1;
        const tr = tbody.find('tr');
        let count = 0;
        tr.each((i, v) => {
            if (i < tr.length - 1) {
                const val = Number($(v).find(`td:nth-child(${nth}) select.number`).val());
                if (val && !isNaN(val)) {
                    count += val;
                }
            }
        });
        const totalTd = tr.eq(tr.length-1).find(`td:nth-child(${nth})`);
        totalTd.text(count);
        totalTd.removeAttr('class');
        if(count > 15){
            totalTd.addClass(`seal_over`);
        }else if(count === 15){
            totalTd.addClass(`seal3`);
        }else if(count < 15 && count > 10){
            totalTd.addClass(`seal_strange`);
        }else if(count === 10){
            totalTd.addClass(`seal2`);
        }else if(count < 10 && count > 5){
            totalTd.addClass(`seal_strange`);
        }else if(count === 5){
            totalTd.addClass(`seal1`);
        }else{
            totalTd.addClass(`seal_under`);
        }
    });

    //특성 select 추가
    for (const [key, value] of Object.entries(dealOption)) {
        const option = `<option value="${value}" data-status>${key}</option>`;
        $('select.status').append(option);
    }

    //등급 select 추가
    for (const [key, value] of Object.entries(grade)) {
        const option = `<option value="${value}" data-status>${key}</option>`;
        $('select.grade').append(option);
    }
    $('select.grade').val(grade.유물);

    // 각인 모달창 각인 추가
    for (const [key, value] of Object.entries(imprintOption)) {
        const option = `<option value="${key}" data-imprint="${value}">${key}</option>`;
        $('#sealSelector').append(option);
    }


    // 각인 모달창
    let currentSeal = 1;
    $('.table th.th-seal').off('click').on('click', function () {
        currentSeal = Number($(this).attr('data-seal'));
        if ($(this).text() !== `각인${currentSeal}`) {
            $('#sealSelector').val($(this).text());
        }
        $('#seal-modal').modal('show');
    });

    $('#saveSeal').off('click').on('click', function () {
        const seal = $('#sealSelector').val();
        if (seal) {
            $(`.th-seal[data-seal="${currentSeal}"]`).html(seal + '<i class="ni ni-bold-down"></i>');
            $('#sealSelector').val('');
        } else {
            $(`.th-seal[data-seal="${currentSeal}"]`).html(`각인${currentSeal}` + '<i class="ni ni-bold-down"></i>');
        }
        $('#seal-modal').modal('hide');
    });
});