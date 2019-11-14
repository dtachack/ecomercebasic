import { Component, OnInit } from "@angular/core";
import { StorageService } from "src/app/shared/services/storage.service";
import { NAME_STORAGE_TOKEN } from "src/app/shared/const/globals";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private storageService: StorageService, private router: Router) {
    this.storageService.select(NAME_STORAGE_TOKEN).subscribe(x => {
      if (x === null) this.router.navigateByUrl("/home");
    });
  }

  ngOnInit() {}
}
