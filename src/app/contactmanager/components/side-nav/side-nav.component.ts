import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public isScreenSmall: Boolean;
  users: Observable<User[]>;
  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService) { }

  ngOnInit(): void {
    this.breakpointObserver
    .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches
      });
      this.users = this.userService.users;
      this.userService.loadAll();
      this.users.subscribe(data => {
        console.log(data);
      })
  }

}