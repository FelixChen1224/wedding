# 周陳府喜宴 GitHub Pages 網站

這是一個可直接部署到 GitHub Pages 的靜態婚宴網站。

## Google 表單設定

網站目前使用 Google Forms iframe 內嵌表單：

- 內嵌表單：`index.html` 的 `#form` 區塊
- 表單區塊放在頁面底部，讓賓客先看完流程、影片與停車資訊

Google Forms iframe 內部樣式不能由 GitHub Pages 的 CSS 直接修改；表單本體的顏色、字體與封面需要在 Google Forms 後台手動調整。

建議設定：

1. 打開 Google 表單編輯頁。
2. 點右上角「自訂主題」圖示。
3. 主題色選自訂色：`#70283A`。
4. 背景色選米白、淺暖色，接近網站底色。
5. 字體選正式、易讀的樣式；手機版建議頁首字級調到 `18` 或 `20`，不要使用 `24`。
6. 表單標題建議改成「感恩禮拜與喜宴回覆」，避免手機上標題擠成不自然換行。
7. 在「您的姓名」與「是否出席喜宴？」之間新增必填單選題：

```text
題目：您是哪一方親友？
選項：
男方親友（周弘明）
女方親友（陳淑玲）
雙方共同親友
其他／主婚人協助邀請
說明：方便分別統計男方、女方親友與安排桌次。
```

8. 表單說明可放：

```text
周陳府喜宴
周弘明與陳淑玲，在上帝祝福與親友見證中，從一場剛好的相識走向一生相伴。
敬請協助回覆是否出席，以便安排席次。

禮拜：2026年6月27日（星期六）上午10:30 結婚感恩禮拜
午宴：2026年6月27日（星期六）中午12:00
地點：一葉日本料理
地址：嘉義市西區西平里博愛路二段700號
停車：第二停車場位於嘉義市西區友忠路52號
飲品：現打果汁、手沖冷泡茶，NO 紅酒
```

若之後要更換表單，請同時修改：

1. `index.html` 裡 iframe 的 `src`
2. `script.js` 裡的 `rsvpFormUrl`

## 部署到 GitHub Pages

1. 在 GitHub repository 進入 `Settings`
2. 點 `Pages`
3. `Build and deployment` 選 `Deploy from a branch`
4. Branch 選 `main`
5. Folder 選 `/root`
6. 儲存後等待 GitHub 產生網址

## 可客製的位置

- 網站標題：`index.html`
- 主婚人與新人故事：`index.html`
- 基督教祝福與婚姻盟約文字：`index.html` 的 `#blessing` 區塊
- 結婚感恩禮拜、喜宴日期、時間、地點：`index.html` 與 `script.js`
- 停車資訊：`index.html` 與 `script.js`
- 停車導引圖：`assets/parking-guide.svg`
- 影片區塊：`assets/wedding-video.mp4`，`assets/wedding-video.mov`
- 彩蛋影片：`assets/wedding-moment.mov`
- 封面圖片：`assets/hero.svg`
- 主色調：`styles.css` 最上方的 `:root`
