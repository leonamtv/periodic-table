import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExcelService } from 'src/app/excel.service';

export interface Element {
  name: string;
  number: string;
  atomic_mass: string;
  symbol: string;
  density: string;
  boil: string;
  melt: string;
}

@Component({
  selector: 'app-element-grid',
  templateUrl: './element-grid.component.html',
  styleUrls: ['./element-grid.component.scss']
})
export class ElementGridComponent implements AfterViewInit {

  @Input() elements: Element[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: any = [];

  displayedColumns: string[] = ['number', 'symbol', 'name', 'atomic_mass', 'density', 'boil', 'melt'];

  constructor(
    private cdr: ChangeDetectorRef,
    private excelService: ExcelService
  ) {  }
  
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.elements)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase()
    this.dataSource.filter = filterValue
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportToCsv () {
    this.excelService.saveCsv ( this.elements, 'elements' )
  }

}
