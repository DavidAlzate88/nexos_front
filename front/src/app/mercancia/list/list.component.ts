import { Component, DoCheck, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MercanciasService } from "../mercancias.service";

export interface Mercancias {
  id: number;
  nombre_producto: string;
  cantidad: number;
  fecha_ingreso: string;
  id_usuario: string;
  usuario: string;
  acciones: string[];
}

const ELEMENT_DATA: Mercancias[] = [];

@Component({
  selector: 'app-mercancia-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, DoCheck {
  displayedColumns: string[] = ['id', 'nombre_producto', 'cantidad', 'fecha_ingreso', 'id_usuario', 'usuario', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(
    private router: Router,
    private mercanciasService: MercanciasService
  ) { }

  ngOnInit(): void {
    this.getMercancias();
  }

  ngDoCheck(): void {}

  private getMercancias(): void {
    this.mercanciasService.getMercancias()
      .then((data: any) => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editar(data: any) {
    this.mercanciasService.data = data;
    this.router.navigate(['mercancias/create'], { queryParams: {id: data.id}});
  }

  eliminar(data: any) {
    this.router.navigate(['mercancias/delete'], { queryParams: {id: data.id, id_usuario: data.usuario.id}});
  }
}
