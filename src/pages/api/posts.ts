import { readdir, readFile } from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';

const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const files = await readdir(join(__dirname, '../../../../src/blogs'));

  const promises: Array<Promise<string>> = [];
  files.map((file) => {
    promises.push(
      readFile(join(__dirname, '../../../../src/blogs', file), {
        encoding: 'utf-8',
      })
    );
  });

  const filesData = await Promise.all(promises);
  return res.status(200).json(files);
};

export default getPosts;
