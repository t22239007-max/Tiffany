import fs from 'fs-extra';
import path from 'path';

/**
 * 统一文件读写工具
 * @param {string} filePath 文件路径
 * @param {any} data 写入数据
 * @param {object} options 配置
 */
export const writeFile = async (filePath, data, options = {}) => {
  await fs.ensureDir(path.dirname(filePath));
  if (typeof data === 'object') {
    await fs.writeJson(filePath, data, { spaces: 2, ...options });
  } else {
    await fs.writeFile(filePath, data, options);
  }
};

export const readFile = async (filePath, options = {}) => {
  if (!await fs.pathExists(filePath)) {
    return null;
  }
  const ext = path.extname(filePath);
  if (ext === '.json') {
    return await fs.readJson(filePath, options);
  }
  return await fs.readFile(filePath, 'utf8', options);
};

export const ensureDir = async (dirPath) => {
  await fs.ensureDir(dirPath);
};

export default { writeFile, readFile, ensureDir };
