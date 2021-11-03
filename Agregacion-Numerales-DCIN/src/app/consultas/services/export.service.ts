import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileTypeTxt = 'text/plain;charset=utf-8';
  fileExtension = '.xlsx';
  fileCsvExtension = '.csv';
  fileTxtExtension = '.txt';

  public exportExcel(jsonData: any[], fileName: string): void {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  public exportCsv(jsonData: any[], fileName: string): void {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const csv = XLSX.utils.sheet_to_csv(ws);
    this.saveExcelFile(csv, fileName, this.fileCsvExtension);
  }

  public exportTxt(jsonData: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const csv = XLSX.utils.sheet_to_csv(ws).split('|');
    this.saveExcelFile(csv, fileName, this.fileTxtExtension);
  }
  
  private saveExcelFile(buffer: any, fileName: string, extension: string = this.fileExtension): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + extension);
  }

  private saveTxtFile(buffer: any, fileName: string, extension: string = this.fileExtension): void {
    const data: Blob = new Blob([buffer], {type: this.fileTypeTxt});
    FileSaver.saveAs(data, fileName + extension);
  }
}
