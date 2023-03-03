import { Component, OnInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable/public-api';
import { Model } from 'src/app/models/model';
import { ModelService } from 'src/app/services/modelService/model.service';

@Component({
  selector: 'app-data-table-test',
  templateUrl: './data-table-test.component.html',
  styleUrls: ['./data-table-test.component.scss']
})
export class DataTableTestComponent implements OnInit {


  modelList : Model[] = []
  searchModel = ["id", "Name","netWeight","fire","shateIronWeight","iProfilWeight","fireShateIronWeight"];
  selectedOptionAccessPointDevices: number = 10;
  filterText="";
  constructor(
    private modelService : ModelService,
  ) { }

  ngOnInit(): void {
    this.getAllModel()
  }

  getAllModel(){
    console.log("Başladı")
    this.modelService.getAllModel().subscribe(response => {
      console.log("bAŞARILI")
      this.modelList = response.data
      console.log(this.modelList)
      console.log(response.data)
    })
  }

}
