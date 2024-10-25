import { Injectable, Type } from '@nestjs/common';
import path from 'path';
import { v4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FileService {
  constructor() {}

  async writeFile(file: any) {
    const fileType = file.originalname.split('.').pop();
    const fileName = v4() + '.' + fileType;
    const filePath = path.resolve(__dirname, '..', 'uploads');

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    fs.writeFileSync(
      path.resolve(__dirname, '..', 'uploads', fileName),
      file.buffer(),
    );

    return '/' + fileName;
  }

  async removeFile(type: Type, file: any) {
    const filePath = path.resolve(__dirname, '..', 'uploads', file);
    fs.promises.unlink(filePath);

    console.log('File is deleted');
  }
}
