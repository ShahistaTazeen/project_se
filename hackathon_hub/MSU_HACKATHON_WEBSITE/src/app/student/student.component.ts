import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'] // Use "styleUrls" instead of "styleUrl"
})
export class StudentComponent implements OnInit {
  studentData = {
    participantName: '',
    email: '',
    MID: '',
  };
  searchQuery: string = '';
  events: any[] = [];
  searchResults: any[] = [];
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    this.http.get("http://localhost:3000/api/events")
      .subscribe((resultData: any) => {
        this.events = resultData.data;
      });
  }
  performSearch() {
    const query = this.searchQuery.toLowerCase().trim();
    
    // If the search query is empty, set searchResults to an empty array
    if (!query) {
      this.searchResults = [];
      return;
    }

    // Filter events based on the search query matching any field
    this.searchResults = this.events.filter(event => {
      return (
        (event.eventname && event.eventname.toLowerCase().includes(query)) ||
        (event.organizername && event.organizername.toLowerCase().includes(query)) ||
        (event.prizemoney && event.prizemoney.toString().includes(query)) ||
        (event.date && new Date(event.date).toLocaleDateString().includes(query))
      );
    });
  }

  registerEvent(eventName: string) {
    this.router.navigate([`/events/${eventName}/register`]);
  }
}
