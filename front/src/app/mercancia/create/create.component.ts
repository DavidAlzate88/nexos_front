import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { MercanciasService } from "../mercancias.service";

@Component({
  selector: 'app-mercancia-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  id = null;
  title = 'Registrar mercancia';
  peticion = 'POST';
  delete = false;
  selectOptions: any = [];
  maxDate = new Date();
  formGroup = this.fb.group({
    id: [''],
    nombreProducto: ['', Validators.required],
    cantidad: ['', Validators.required],
    fechaIngreso: [{value: '', disabled: true}, Validators.required],
    idUsuario: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private mercanciasService: MercanciasService
  ) {
    this.getUsers();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.id = params.id);

    if (this.id) {
      this.title = 'Actualizar mercancia id: ' + this.id;
      this.peticion = 'PUT';
      if(this.mercanciasService.data) {
        const data = this.mercanciasService.data;
        this.formGroup.get('id')?.setValue(this.id);
        this.formGroup.get('nombreProducto')?.setValue(data.nombre_producto);
        this.formGroup.get('cantidad')?.setValue(data.cantidad);
        this.formGroup.get('fechaIngreso')?.setValue(new Date(data.fecha_ingreso));
        this.formGroup.get('idUsuario')?.setValue(data.usuario?.id);
      } else {
        console.error('Ha ocurrido un error al cargar la vista de actualización');
        this.router.navigate(['mercancias/list']);
      }
    }
  }

  getUsers(): void {
    this.mercanciasService.getUsers()
      .then((data: any) => {
        data.forEach((item: any) => {
          const nombre = item.nombre + ' ' + item.apellido;
          const data = {
            label: nombre,
            value: item.id,
            data: item
          };

          this.selectOptions.push(data)
        });

        console.log(this.selectOptions);
      });
  }

  get registerFormControl() {
    return this.formGroup.controls;
  }

  onSubmit(): void {
    if (this.validateDate(this.formGroup.getRawValue().fechaIngreso)) {
      if (this.formGroup.valid) {
        if (!this.id){
          this.guardar();
        } else {
          this.editar();
        }
      } else {
        this.snackBar.open('Debes diligenciar correctamente los campos.', 'Aceptar', {
          duration: 2000,
        });
      }
    }
  }

  private validateDate(selectedDate: string) {
    const pickedDate = new Date(selectedDate);
    const todaysDate = new Date();
    pickedDate.setHours(0, 0, 0, 0);
    todaysDate.setHours(0, 0, 0, 0);

    if (pickedDate <= todaysDate) {
      const parseDate = new Date(Date.parse(selectedDate));
      const dd = String(parseDate.getDate()).padStart(2, '0');
      const mm = String(parseDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = parseDate.getFullYear();
      const parsedDate = yyyy + '-' + mm + '-' + dd;

      this.formGroup.controls.fechaIngreso.setValue(parsedDate);

      return true;
    } else {
      this.snackBar.open('La fecha ingresada no puede ser superior a la fecha actual.', 'Aceptar', {
        duration: 2000,
      });

      return false;
    }
  }

  private guardar(): void {
    const datos = {
      nombre_producto: this.formGroup.value.nombreProducto,
      cantidad: this.formGroup.value.cantidad,
      fecha_ingreso: this.formGroup.getRawValue().fechaIngreso,
      usuario: {
        id: this.formGroup.value.idUsuario
      }
    };

    this.mercanciasService.create(datos).then(() => {
      const snackBarRef = this.snackBar.open('Mercancia registrada exitosamente.', 'Aceptar', {
        duration: 2000,
      });

      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(['mercancias/list']);
      });

    }).catch((error: any) => {
      if (error.error.message.includes('ConstraintViolationException')) {
        this.snackBar.open('El nombre ingresado ya existe en la base de datos.', 'Aceptar', {
          duration: 2000,
        });
      }
    });
  }

  private editar(): void {
    const datos = {
      id: this.id,
      nombre_producto: this.formGroup.value.nombreProducto,
      cantidad: this.formGroup.value.cantidad,
      fecha_ingreso: this.formGroup.getRawValue().fechaIngreso,
      usuario: {
        id: this.formGroup.value.idUsuario
      }
    };

    this.mercanciasService.update(this.id, datos).then(() => {
      const snackBarRef = this.snackBar.open('Mercancia actualizada exitosamente.', 'Aceptar', {
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
  }
}
