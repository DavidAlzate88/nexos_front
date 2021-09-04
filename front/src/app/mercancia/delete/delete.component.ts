import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MercanciasService } from "../mercancias.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  id = null;
  idUser = null;
  title = 'Eliminar mercancia';
  selectOpts: any = [];
  formGroup = this.fb.group({
    idUsuario: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private mercasService: MercanciasService
  ) {
    this.getUsers();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.idUser = params.id_usuario;
    });
  }

  get registerFormControl() {
    return this.formGroup.controls;
  }

  private getUsers(): void {
    this.mercasService.getUsers()
      .then((datos: any) => {
        datos.forEach((item: any) => {
          const nombre = item.nombre + ' ' + item.apellido;
          const data = {
            label: nombre,
            value: item.id,
            data: item
          };

          this.selectOpts.push(data)
        });
      });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      if (this.formGroup.value.idUsuario.toString() === this.idUser) {
        this.mercasService.delete(this.id).then(() => {
          const snackBarRef = this.snackBar.open('Mercancia eliminada exitosamente.', 'Aceptar', {
            duration: 2000,
          });

          snackBarRef.afterDismissed().subscribe(() => {
            this.router.navigate(['mercancias/list']);
          });

        }).catch((error: any) => {
          this.snackBar.open(error.error.message, 'Aceptar', {
            duration: 2000,
          });
        });
      } else {
        this.snackBar.open('Solo puede ser eliminada por el usuario que la registro ', 'Aceptar', {
          duration: 2000,
        });
      }
    }
  }
}
