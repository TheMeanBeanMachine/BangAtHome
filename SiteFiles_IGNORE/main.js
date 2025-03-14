import { bangs } from './bang.js';
//import './global.css';

// function noSearchDefaultPageRender() {
//   const app = document.querySelector('#app');
//   app.innerHTML = `
//     <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
//       <div class="content-container">
//         <h1>Und*ck</h1>
//         <p>DuckDuckGo...oose haha get it? Shut up i know theres any extra O.  Enables <a href="https://duckduckgo.com/bang.html" target="_blank">all of DuckDuckGo's bangs.</a></p>
//         <div class="url-container">
//           <input
//             type="text"
//             class="url-input"
//             value="https://unduck.link?q=%s"
//             readonly
//           />
//           <button class="copy-button">
//             <img src="/clipboard.svg" alt="Copy" />
//           </button>
//         </div>
//       </div>
//       <footer class="footer">
//         <a href="https://lingoleap.42web.io/" target="_blank">TinyBeanBytes</a>
//         •
//         <a href="https://www.linkedin.com/in/zacharyend" target="_blank">Me</a>
//         •
//         <a href="https://github.com/TheMeanBeanMachine/oose" target="_blank">Me github</a>
//       </footer>
//     </div>
//   `;

//   const copyButton = app.querySelector('.copy-button');
//   const copyIcon = copyButton.querySelector('img');
//   const urlInput = app.querySelector('.url-input');

//   copyButton.addEventListener('click', async () => {
//     await navigator.clipboard.writeText(urlInput.value);
//     copyIcon.src = '/clipboard-check.svg';

//     setTimeout(() => {
//       copyIcon.src = '/clipboard.svg';
//     }, 2000);
//   });
// }

const LS_DEFAULT_BANG = localStorage.getItem('default-bang') ?? 'g';
const defaultBang = bangs.find((b) => b.t === LS_DEFAULT_BANG);

function getBangredirectUrl() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get('q')?.trim() ?? '';
  if (!query) {
    noSearchDefaultPageRender();
    return null;
  }

  const match = query.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang = bangs.find((b) => b.t === bangCandidate) ?? defaultBang;

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, '').trim();

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    '{{{s}}}',
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, '/')
  );
  if (!searchUrl) return null;

  return searchUrl;
}

function doRedirect() {
  const searchUrl = getBangredirectUrl();
  if (!searchUrl) return;
  window.location.replace(searchUrl);
}

doRedirect();