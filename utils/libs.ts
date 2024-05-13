/**
 * Util lib functions
 */

import numeral from "numeral";

// generate a random string
export function randString(length: number) {
  const str = "0123456789abcdefghijklmnopqrstuvwxyz";
  const size = str.length;
  let buf = [];
  for (let i = 0; i < length; i++) {
    const rand = Math.random() * size;
    buf.push(str.charAt(rand));
  }
  return buf.join("");
}

export function UUID() {
  let d = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// 判断是否是移动设备
export function isMobile() {
  const userAgent = navigator.userAgent;
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
}

// 判断是否是Safari浏览器
export function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export function isImage(url: string) {
  const expr = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
  return expr.test(url);
}

// 处理内容
export const processContent = (content: string) => {
  //process img url
  const linkRegex = /(https?:\/\/\S+)/g;
  const links = content.match(linkRegex);
  if (links) {
    for (let link of links) {
      if (isImage(link)) {
        const index = content.indexOf(link);
        if (content.substring(index - 1, 2) !== "]") {
          content = content.replace(link, "\n![](" + link + ")\n");
        }
      }
    }
  }

  // 处理引用块
  if (content.indexOf("\n") === -1) {
    return content;
  }

  const texts = content.split("\n");
  const lines = [];
  for (let txt of texts) {
    lines.push(txt);
    if (txt.startsWith(">")) {
      lines.push("\n");
    }
  }
  return lines.join("\n");
};

export const delay = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

export const stopPropagation = (e: React.MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
};

export const jsonParse = <T>(str?: string, defaultValue: T = {} as T): T => {
  if (!str) return defaultValue;
  try {
    return JSON.parse(str) as T;
  } catch (e) {
    return defaultValue;
  }
};

export const formatNumber = (num: number) => {
  if (num >= 1e11) {
    return numeral(num).format("0.00a").replace("t", "百亿");
  } else if (num >= 1e10) {
    return numeral(num).format("0.00a").replace("b", "十亿");
  } else if (num >= 1e9) {
    return numeral(num).format("0.00a").replace("b", "亿");
  } else if (num >= 1e8) {
    return numeral(num).format("0.00a").replace("m", "千万");
  } else if (num >= 1e6) {
    return numeral(num).format("0.00a").replace("m", "百万");
  } else if (num >= 1e5) {
    return numeral(num).format("0.00a").replace("k", "十万");
  } else if (num >= 1e4) {
    return numeral(num).format("0.00a").replace("k", "万");
  } else if (num >= 1e3) {
    return numeral(num).format("0.00a").replace("k", "千");
  } else {
    return num.toString();
  }
};
