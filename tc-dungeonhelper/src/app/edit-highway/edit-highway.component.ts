import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Enc } from '../enc';
import { HighwayComponent } from '../highway/highway.component';

@Component({
  selector: 'app-edit-highway',
  standalone: true,
  imports: [HighwayComponent, RouterModule, RouterOutlet],
  templateUrl: './edit-highway.component.html',
  styleUrls: ['./edit-highway.component.css']
})
export class EditHighwayComponent implements OnInit {
  highwayEncs: Enc[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Enc[]>('/api/highwayEncs').subscribe(data => {
      this.highwayEncs = data;
    });
  }

  saveEdits(): void {
    this.http.put('/api/highwayEncs', this.highwayEncs).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}