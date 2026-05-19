# 周陳府喜宴 GitHub Pages 網站

這是一個可直接部署到 GitHub Pages 的靜態網站，不需要安裝套件或啟動伺服器。

## Google 表單連結

目前網站已放入 Google 表單：

- 內嵌表單：`index.html` 的 `#form` 區塊
- 另開表單按鈕：`script.js` 的 `rsvpFormUrl`

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
