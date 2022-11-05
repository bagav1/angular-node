import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedRowIndex: number = -1;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'lastname', 'age', 'email', 'phone',];
  user: any = {}

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

  clickRow(row: any) {
    this.selectedRowIndex = row.id;
    this.user = row;
  }

  saveUser() {
    if (this.user.id) {
      this._userService.update(this.user, this.user.id).subscribe(
        (res) => {
          this.tableData();
          this.user = {};
          this.selectedRowIndex = -1;
        }
      );
    }
  }

  deleteUser() {
    console.log('delete');
  }
}
