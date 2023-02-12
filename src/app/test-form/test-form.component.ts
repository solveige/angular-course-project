import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent {
  @ViewChild('testForm') form: NgForm;

  projectStatuses = ['Stable', 'Critical', 'Finished'];
  invalidProjectNames = ['test']

  projectForm = new FormGroup({
    projectName: new FormControl('', [Validators.required], this.invalidProjectName.bind(this)),
    email: new FormControl('', [Validators.email, Validators.required]),
    projectStatus: new FormControl(this.projectStatuses[1])
  })

  defaultSubscription = 'advanced';

  onSubmit() {
    console.log(this.form);
  }

  onProjectFormSubmit(){
    console.log(this.projectForm);
  }

  // invalidProjectName(control: FormControl): {[s: string]: boolean} {
    
  //   if(this.invalidProjectNames.includes(control.value)) {
  //     return  {'invalidName': true}
  //   }

  //   return null;
  // }

  invalidProjectName(control: FormControl): Promise<any> | Observable<any> {
    
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(this.invalidProjectNames.includes(control.value)) {
          resolve({'invalidName': true})
        }else{
          resolve(null)
        }
      }, 1500)
    })

    return promise;
  }


}
