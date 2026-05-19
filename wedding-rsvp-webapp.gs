const WEDDING_WEBAPP_CONFIG = {
  sheetPropertyKey: 'WEDDING_RSVP_SPREADSHEET_ID',
  responseSheetTitle: '周陳府喜宴出席名單',
  sheetName: '出席回覆',
  eventTitle: '周陳府喜宴',
  eventDate: '2026年6月27日（星期六）',
  eventTime: '中午12:00',
  venueName: '一葉日本料理',
  venueAddress: '嘉義市西區西平里博愛路二段700號'
};

function doGet() {
  return HtmlService.createHtmlOutput(buildWeddingRsvpHtml())
    .setTitle(WEDDING_WEBAPP_CONFIG.eventTitle + '出席回覆表')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function submitWeddingRsvp(payload) {
  const sheet = getWeddingRsvpSheet_();
  sheet.appendRow([
    new Date(),
    payload.name || '',
    payload.phone || '',
    payload.attendance || '',
    payload.guestCount || '',
    payload.companions || '',
    Array.isArray(payload.mealNeeds) ? payload.mealNeeds.join('、') : '',
    payload.note || '',
    payload.blessing || ''
  ]);

  return {
    ok: true,
    message: '感謝您的回覆，期待與您相聚。'
  };
}

function getWeddingRsvpSheet_() {
  const props = PropertiesService.getScriptProperties();
  let spreadsheetId = props.getProperty(WEDDING_WEBAPP_CONFIG.sheetPropertyKey);
  let spreadsheet;

  if (spreadsheetId) {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  } else {
    spreadsheet = SpreadsheetApp.create(WEDDING_WEBAPP_CONFIG.responseSheetTitle);
    props.setProperty(WEDDING_WEBAPP_CONFIG.sheetPropertyKey, spreadsheet.getId());
  }

  let sheet = spreadsheet.getSheetByName(WEDDING_WEBAPP_CONFIG.sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(WEDDING_WEBAPP_CONFIG.sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      '提交時間',
      '姓名',
      '聯絡電話',
      '是否出席',
      '出席人數',
      '同行賓客',
      '餐飲需求',
      '備註',
      '祝福'
    ]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function buildWeddingRsvpHtml() {
  return `<!doctype html>
<html lang="zh-Hant">
  <head>
    <base target="_top">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      :root {
        --ink: #352c2a;
        --muted: #6c625e;
        --paper: #fffaf4;
        --panel: #ffffff;
        --wine: #70283a;
        --wine-dark: #4b1724;
        --teal: #174d49;
        --teal-soft: #e5f0ec;
        --gold: #bd8a37;
        --line: #e6d8c8;
        font-family: "Noto Serif TC", "Noto Sans TC", "Microsoft JhengHei", serif;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        color: var(--ink);
        background: linear-gradient(135deg, rgba(112, 40, 58, 0.07), rgba(23, 77, 73, 0.08)), var(--paper);
        font-size: 17px;
        line-height: 1.7;
      }

      .wrap {
        width: min(760px, 100%);
        margin: 0 auto;
        padding: 28px clamp(16px, 4vw, 34px) 36px;
      }

      .mast {
        border-top: 8px solid var(--wine);
        border-radius: 8px;
        padding: 26px;
        background: var(--panel);
        box-shadow: 0 18px 50px rgba(62, 43, 32, 0.12);
      }

      .eyebrow {
        margin: 0 0 8px;
        color: var(--gold);
        font-size: 0.82rem;
        font-weight: 800;
      }

      h1 {
        margin: 0;
        font-size: clamp(2.2rem, 8vw, 4rem);
        line-height: 1.12;
      }

      .intro {
        margin: 14px 0 0;
        color: var(--muted);
      }

      form {
        display: grid;
        gap: 18px;
        margin-top: 22px;
      }

      label,
      legend {
        display: block;
        margin-bottom: 8px;
        font-weight: 800;
      }

      input,
      select,
      textarea {
        width: 100%;
        min-height: 48px;
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 12px 14px;
        color: var(--ink);
        background: #fff;
        font: inherit;
      }

      textarea {
        min-height: 104px;
        resize: vertical;
      }

      fieldset {
        margin: 0;
        border: 0;
        padding: 0;
      }

      .options {
        display: grid;
        gap: 10px;
      }

      .choice {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 48px;
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 10px 12px;
        background: #fff;
      }

      .choice input {
        width: auto;
        min-height: auto;
      }

      .button {
        min-height: 56px;
        border: 0;
        border-radius: 8px;
        padding: 14px 22px;
        color: #fffdf9;
        background: var(--wine);
        font: inherit;
        font-weight: 800;
        cursor: pointer;
      }

      .button:disabled {
        cursor: wait;
        opacity: 0.72;
      }

      .status {
        min-height: 28px;
        color: var(--teal);
        font-weight: 800;
      }

      @media (max-width: 520px) {
        .wrap {
          width: 100%;
          padding: 0 0 28px;
        }

        .mast {
          border-left: 0;
          border-right: 0;
          border-radius: 0;
          padding: 24px 18px;
        }
      }
    </style>
  </head>
  <body>
    <main class="wrap">
      <section class="mast">
        <p class="eyebrow">RSVP</p>
        <h1>周陳府喜宴出席回覆表</h1>
        <p class="intro">從一次配對開始，將守護與照顧走成一生相伴。敬請協助回覆，以便安排席次。</p>
        <p class="intro">${WEDDING_WEBAPP_CONFIG.eventDate} ${WEDDING_WEBAPP_CONFIG.eventTime}<br>${WEDDING_WEBAPP_CONFIG.venueName}｜${WEDDING_WEBAPP_CONFIG.venueAddress}</p>

        <form id="rsvpForm">
          <div>
            <label for="name">您的姓名</label>
            <input id="name" name="name" autocomplete="name" required>
          </div>

          <div>
            <label for="phone">聯絡電話</label>
            <input id="phone" name="phone" autocomplete="tel" required>
          </div>

          <fieldset>
            <legend>是否出席喜宴？</legend>
            <div class="options">
              <label class="choice"><input type="radio" name="attendance" value="欣然出席" required>欣然出席</label>
              <label class="choice"><input type="radio" name="attendance" value="當天有事，不克前往">當天有事，不克前往</label>
            </div>
          </fieldset>

          <div>
            <label for="guestCount">出席人數，含本人</label>
            <select id="guestCount" name="guestCount">
              <option value="">未出席或尚未確定</option>
              <option>1位</option>
              <option>2位</option>
              <option>3位</option>
              <option>4位</option>
              <option>5位</option>
              <option>6位</option>
              <option>7位</option>
              <option>8位以上</option>
            </select>
          </div>

          <div>
            <label for="companions">同行賓客姓名</label>
            <textarea id="companions" name="companions"></textarea>
          </div>

          <fieldset>
            <legend>餐飲需求或忌口</legend>
            <div class="options">
              <label class="choice"><input type="checkbox" name="mealNeeds" value="無特殊需求">無特殊需求</label>
              <label class="choice"><input type="checkbox" name="mealNeeds" value="素食">素食</label>
              <label class="choice"><input type="checkbox" name="mealNeeds" value="不吃牛">不吃牛</label>
              <label class="choice"><input type="checkbox" name="mealNeeds" value="不吃豬">不吃豬</label>
              <label class="choice"><input type="checkbox" name="mealNeeds" value="海鮮過敏">海鮮過敏</label>
              <label class="choice"><input type="checkbox" name="mealNeeds" value="其他">其他</label>
            </div>
          </fieldset>

          <div>
            <label for="note">其他備註</label>
            <textarea id="note" name="note"></textarea>
          </div>

          <div>
            <label for="blessing">給新人的祝福</label>
            <textarea id="blessing" name="blessing"></textarea>
          </div>

          <button class="button" type="submit">送出回覆</button>
          <div class="status" id="status" role="status" aria-live="polite"></div>
        </form>
      </section>
    </main>

    <script>
      const form = document.querySelector('#rsvpForm');
      const status = document.querySelector('#status');

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const button = form.querySelector('button[type="submit"]');
        const data = new FormData(form);
        const payload = {
          name: data.get('name'),
          phone: data.get('phone'),
          attendance: data.get('attendance'),
          guestCount: data.get('guestCount'),
          companions: data.get('companions'),
          mealNeeds: data.getAll('mealNeeds'),
          note: data.get('note'),
          blessing: data.get('blessing')
        };

        button.disabled = true;
        status.textContent = '送出中...';

        google.script.run
          .withSuccessHandler((result) => {
            status.textContent = result.message || '感謝您的回覆。';
            form.reset();
            button.disabled = false;
          })
          .withFailureHandler((error) => {
            status.textContent = '送出失敗，請稍後再試或改用 Google 表單。';
            button.disabled = false;
            console.error(error);
          })
          .submitWeddingRsvp(payload);
      });
    </script>
  </body>
</html>`;
}
