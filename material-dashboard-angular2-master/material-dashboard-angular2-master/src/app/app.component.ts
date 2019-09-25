import { Component} from '@angular/core';
import { UserService } from './user-profile/user-profile.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]  
})
export class AppComponent {

}
