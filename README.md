# 周陳府喜宴 GitHub Pages 網站

這是一個可直接部署到 GitHub Pages 的靜態網站，不需要安裝套件或啟動伺服器。

## Google 表單連結

目前網站已放入 Google 表單：

- 內嵌表單：`index.html` 的 `#form` 區塊
- 另開表單按鈕：`script.js` 的 `rsvpFormUrl`

網站已將表單外框套用酒紅、墨綠、金色系。Google 表單 iframe 內部不能由網站 CSS 直接改樣式；若要讓 Google 表單本體也一致，請在 Google Forms 右上角「自訂主題」設定：

- 主題色：酒紅 `#70283A`
- 背景色：米白或淺暖色
- 字體：建議選較正式、易讀的字體
- 表單說明：可使用 `wedding-rsvp-form.gs` 內的新版新人故事文案

如果之後要更換表單，請同時修改：

1. `index.html` 裡 iframe 的 `src`
2. `script.js` 裡的 `rsvpFormUrl`

## 部署到 GitHub Pages

1. 在 GitHub 建立一個 repository
2. 上傳這些檔案：
   - `index.html`
   - `styles.css`
   - `script.js`
   - `assets/hero.svg`
3. 到 repository 的 `Settings`
4. 點 `Pages`
5. `Build and deployment` 選 `Deploy from a branch`
6. Branch 選 `main`，資料夾選 `/root`
7. 儲存後等待 GitHub 產生網址

## 可客製的位置

- 網站標題：`index.html`
- 新人與主婚人資訊：`index.html`
- 喜宴日期、時間、地點：`index.html` 與 `script.js`
- 封面圖片：替換 `assets/hero.svg`
- 主色調：`styles.css` 最上方的 `:root`
