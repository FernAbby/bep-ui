// import * as XLSX from 'xlsx'
import { extraFileExtension } from './file'

/**
 * 是否为 office 文件
 * @param {string} ext
 */
export function isOfficeFile(ext: string) {
  return ['xls', 'xlsx', 'doc', 'docx', 'ppt', 'pptx', 'one'].includes(ext) // 其实 .pdf 文件也能预览
}

/**
 * 预览图片文件
 * @param {string} url
 */
export function previewImage(url: string) {
  return {
    src: '',
    // content: `<!DOCTYPE html><html><body style="padding: 20px;text-align: center;"><img src="${url}" /></body></html>`
    content: `<div style="padding: 20px;text-align: center;"><img src="${url}" /></div>`
  }
}

/**
 * 预览 office 文件
 * @param {string} url
 */
export function previewOfficeFile(url: string) {
  const excelUrl = encodeURIComponent(url)
  let newUrl = `https://view.xdocin.com/view?src=${excelUrl}`
  if (/^https:/.test(excelUrl)) {
    newUrl = `https://view.officeapps.live.com/op/view.aspx?src=${excelUrl}`
  }
  return {
    src: newUrl,
    content: ''
  }
}

/**
 * 预览 office 文件
 * @param {string} url
 */
// export function previewCSVFile(url: string) {
//   return fetch(url)
//     .then(response => response.arrayBuffer())
//     .then(buffer => {
//       // 解析CSV
//       const workbook = XLSX.read(buffer, { type: 'array' });
//
//       // 创建新窗口
//       // const newWindow = window.open('', '_blank');
//
//       // 转换为HTML表格
//       const firstSheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[firstSheetName];
//       const html = XLSX.utils.sheet_to_html(worksheet);
//       console.log('html--->', html)
//
//       // 写入新窗口
//       return {
//         src: '',
//         content: `
//         <!DOCTYPE html>
//         <html>
//           <head>
//             <title>CSV预览</title>
//             <style>
//               body { margin: 20px; }
//               table { border-collapse: collapse; width: 100%; }
//               th { background-color: #f2f2f2; padding: 10px; text-align: left; }
//               td { padding: 8px; border: 1px solid #ccc; }
//             </style>
//           </head>
//           <body>
//             ${html}
//           </body>
//         </html>
//       `
//       }
//     }).catch((error) => {
//       console.error(error)
//       return {
//         src: '',
//         content: '',
//       }
//     })
// }
/**
 * @description 文件预览
 * @param {string} url
 */
export function getPreviewContent(url: string) {
  const extension = extraFileExtension(url)
  // office 文档
  if (isOfficeFile(extension)) {
    return previewOfficeFile(url)
  }

  // csv
  if ('csv' === extension) {
    // previewCSVFile(url)
    return {
      src: '',
      content: ''
    }
  }

  // 图片
  // if (ImageExtensions.has(extension)) {
  //   return previewImage(url)
  // }

  return {
    src: url,
    content: ''
  }
}
// Todo 不支持 rtf、csv、numbers 等文件的预览
/**
 * @description 文件预览
 * @param {string} url
 */
export function previewFile(url: string) {
  const result = getPreviewContent(url)
  if (result.src) {
    window.open(result.src, '_blank')
  } else {
    console.log('content--->', result.content)
    const newWindow = window.open('', '_blank')
    newWindow.document.write(result.content)
    newWindow.document.close()
  }
}
