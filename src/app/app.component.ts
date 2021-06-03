import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger,  MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  addOnBlur = false;
  agentCtrl = new FormControl();
  filteredagents: Observable<string[]>;
  agents: string[] = [];
  allAgents: string[] = ['Gina Williams', 'Jake Williams', 'Jamie John', 'John Doe', 'Jeff Stewart', 'Paula M. Keith'];

  @ViewChild('agentInput') agentInput: ElementRef
  @ViewChild('agentInput', {read: MatAutocompleteTrigger}) autoComplete;

 

  ngOnInit() {

    this.filteredagents = this.agentCtrl.valueChanges.pipe(
        startWith(''),
        map((agent: string | null) => agent ? this._filter(agent) : this.allAgents.slice()));
  }



  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.addagent(value);
   }

    if (input) {
      input.value = '';
    }

    this.agentCtrl.setValue(null);
  }


  someMethod(){
    this.agentCtrl.value;
    return true;
//alert(this.agentInput.nativeElement.value);
  }

  onAgentSelectionChange(event: MatAutocompleteSelectedEvent): void {
    this.updateAgentList(event.option.viewValue);
    this.agentInput.nativeElement.value = '';
    this.agentCtrl.setValue(null);
    
  }

  private _filter(value: string): string[] {
     if(value.startsWith('@')){
        const filterValue = value.toLowerCase().substring(1);

        return this.allAgents.filter(option => option.toLowerCase().includes(filterValue));
      }
  }


  addagent(agent: string): void {
    this.agents.push(agent);
  }

  isAgentSelected(agent: string): boolean {
     return this.agents.indexOf(agent) >= 0;
  }

  updateAgentList(agent: string): void {
    if (!this.isAgentSelected(agent)) {
      this.addagent(agent);
    }
  }
}
