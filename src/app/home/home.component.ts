import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup;
  
  public data: any | undefined;
  params : {
    t: String;
    i: String;
    y:String;
    type: String;
    plot: String;
    apikey:String
  };

  inputTitle: String;

  selectedType:string | undefined;
  selectedPlot:string | undefined;

  constructor(private formBuilder: FormBuilder, private searchService: SearchService, 
    private notification: ToastrService, private router: Router){
    this.searchForm = formBuilder.group({
      title : new FormControl('', Validators.required),
      year : new FormControl('')
    });

    //default values
    this.inputTitle = '';
    this.params={
      apikey: '58d89b76',
      t:'',
      i:'tt3896198',
      y:'',
      type: '',
      plot:'short',
      
    }
  }

  ngOnInit(){
    this.searchService.getSearchResults(this.params).subscribe(
      next=>{
        this.data = next;
      }
    );
    
  }

  selectedTypeMethod(){
    console.log(this.selectedType);
  }

  selectedPlotMethod(){
    console.log(this.selectedPlot);
  }

  onSubmit(){
    //get the title
    this.inputTitle = this.searchForm.get('title')?.value;

    if (this.inputTitle === '') {
      //empty title
      this.notification.warning("Please fill in the title field","Empty Title");
    } else {
      //find all with the input title
      this.params['t'] = this.inputTitle;
      if(this.searchForm.get('year')?.value != null)
        this.params['y'] = this.searchForm.get('year')?.value;
      if(this.selectedType != null)
        this.params['type'] = this.selectedType;
      if(this.selectedPlot != null )
        this.params['plot'] = this.selectedPlot;
      
      this.searchService.getSearchResults(this.params).subscribe(
        next=>{
          console.log(next);
          
          this.data = next;
        },
        error=>{
          //data search with id
          this.params['i'] = this.inputTitle;
          this.params['t'] = '';
          this.searchService.getSearchResults(this.params).subscribe(
            next=>{
              console.log(next);
              this.data = next
            },error=>{
              this.notification.error("Not found","Movie not found");
            }
          );
        }
      );
           
    }
    
  }

}
