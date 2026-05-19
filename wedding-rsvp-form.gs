function createWeddingRsvpForm() {
  const config = {
    formTitle: '周陳府喜宴出席回覆表',
    responseSheetTitle: '周陳府喜宴出席名單',
    hostLine: '男方主婚人：林莉莉\n女方主婚人：陳國安、陳愛仁',
    groomName: '周弘明',
    eventDate: '2026年6月27日（星期六）',
    eventTime: '中午12:00',
    venueName: '一葉日本料理',
    venueAddress: '嘉義市西區西平里博愛路二段700號'
  };

  const form = FormApp.create(config.formTitle);
  const responseSheet = SpreadsheetApp.create(config.responseSheetTitle);

  form.setDescription(
    '誠摯邀請您參加周陳府喜宴，敬請協助填寫出席回覆，以便安排席次。\n\n' +
      config.hostLine + '\n' +
      '新人：' + config.groomName + '\n' +
      '時間：' + config.eventDate + ' ' + config.eventTime + '\n' +
      '地點：' + config.venueName + '\n' +
      '地址：' + config.venueAddress
  );

  form.setConfirmationMessage(
    '感謝您的回覆。\n' +
      '期待於' + config.eventDate + config.eventTime + '在' + config.venueName + '與您相聚。'
  );
  form.setAllowResponseEdits(true);
  form.setCollectEmail(false);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, responseSheet.getId());

  form.addTextItem()
    .setTitle('您的姓名')
    .setHelpText('請填寫受邀人或代表人姓名。')
    .setRequired(true);

  form.addTextItem()
    .setTitle('聯絡電話')
    .setHelpText('方便主辦方確認席次或聯繫。')
    .setRequired(true);

  const attendanceItem = form.addMultipleChoiceItem();
  attendanceItem
    .setTitle('是否出席喜宴？')
    .setHelpText(config.eventDate + ' ' + config.eventTime + '，地點：' + config.venueName)
    .setRequired(true);

  const attendPage = form.addPageBreakItem()
    .setTitle('出席資訊')
    .setHelpText('感謝您的蒞臨，請協助填寫出席人數與餐飲需求。');

  const guestCountItem = form.addListItem();
  guestCountItem
    .setTitle('出席人數，含本人')
    .setChoices([
      '1位',
      '2位',
      '3位',
      '4位',
      '5位',
      '6位',
      '7位',
      '8位以上'
    ].map(function(choice) {
      return guestCountItem.createChoice(choice);
    }))
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('同行賓客姓名')
    .setHelpText('若有同行親友，請填寫姓名，方便安排座位。')
    .setRequired(false);

  const mealItem = form.addCheckboxItem();
  mealItem
    .setTitle('餐飲需求或忌口')
    .setChoices([
      '無特殊需求',
      '素食',
      '不吃牛',
      '不吃豬',
      '海鮮過敏',
      '其他'
    ].map(function(choice) {
      return mealItem.createChoice(choice);
    }))
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('其他備註')
    .setHelpText('例如孩童座椅、特殊餐飲需求或座位安排。')
    .setRequired(false);

  const unablePage = form.addPageBreakItem()
    .setTitle('不克前往')
    .setHelpText('謝謝您的回覆，也歡迎留下給新人的祝福。');

  const blessingPage = form.addPageBreakItem()
    .setTitle('祝福與備註')
    .setHelpText('可留下想對新人說的話。');

  attendPage.setGoToPage(blessingPage);
  unablePage.setGoToPage(blessingPage);

  form.addParagraphTextItem()
    .setTitle('給新人的祝福')
    .setHelpText('選填。')
    .setRequired(false);

  attendanceItem.setChoices([
    attendanceItem.createChoice('欣然出席', attendPage),
    attendanceItem.createChoice('當天有事，不克前往', unablePage)
  ]);

  blessingPage.setGoToPage(FormApp.PageNavigationType.SUBMIT);

  Logger.log('表單填寫網址：' + form.getPublishedUrl());
  Logger.log('表單編輯網址：' + form.getEditUrl());
  Logger.log('回覆試算表網址：' + responseSheet.getUrl());
}
