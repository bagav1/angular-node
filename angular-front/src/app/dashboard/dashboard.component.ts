import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('infoSwal')
  public readonly infoSwal!: SwalComponent;
  user: any = {
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.min(3000000000), Validators.max(3900000000)]),
  }

  selectedRowIndex: number = -1;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'lastname', 'age', 'email', 'phone',];
  errorData: any = {};
  newUser: boolean = true;

  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this._userService.getAll().subscribe(
      (res) => {
        this.dataSource = res.data;
      }
    );
  }

  handlerError() {
    for (const key in this.user) {
      const validate = this.validateField(key);
      validate ? this.errorData[key] = validate : null;
    }
  }

  validateField(field: string) {
    return this.user[field].hasError('required') ? 'Campo requerido' :
      this.user[field].hasError('minlength') ? 'Minimo 3 caracteres' :
        this.user[field].hasError('maxlength') ? 'Maximo 10 caracteres' :
          this.user[field].hasError('email') ? 'Email invalido' :
            this.user[field].hasError('min') ? 'Valor muy bajo' :
              this.user[field].hasError('max') ? 'Valor muy alto' :
                null;
  }

  clickRow(row: any) {
    this.selectedRowIndex = row.id;
    this.newUser = false;
    for (const key in this.user) {
      this.user[key].setValue(row[key]);
    }
  }

  saveUser() {
    this.handlerError();
    if (Object.keys(this.errorData).length === 0) {
      let data: any = {};
      for (const key in this.user) {
        data[key] = this.user[key].value;
      }
      this._userService.create(data).subscribe(
        (res) => {
          console.log(res);
          this.tableData();
          this.cancelAction();
        },
      );
    } else {
      this.infoSwal.fire()
    };
    this.errorData = {};
  }

  updateUser() {
    this.handlerError();
    if (Object.keys(this.errorData).length === 0) {
      let data: any = {};
      for (const key in this.user) {
        data[key] = this.user[key].value;
      }
      this._userService.update(data, this.selectedRowIndex.toString()).subscribe(
        (res) => {
          console.log(res);
          this.tableData();
          this.cancelAction();
        },
      );
    } else {
      this.infoSwal.fire()
    }
    this.errorData = {};
  }

  deleteUser() {
    this._userService.delete(this.selectedRowIndex.toString()).subscribe(
      (res) => {
        console.log(res);
        this.tableData();
        this.cancelAction();
      },
    );
  }

  cancelAction() {
    for (const key in this.user) {
      this.user[key].reset();
    }
    this.newUser = true;
    this.selectedRowIndex = -1;
  }
}
