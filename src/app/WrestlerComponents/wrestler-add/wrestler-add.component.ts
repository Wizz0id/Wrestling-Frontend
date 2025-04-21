import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {WrestlerService} from '../../Service/Wrestler.service';

@Component({
  selector: 'app-wrestler-add',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './wrestler-add.component.html',
  standalone: true,
  styleUrl: './wrestler-add.component.css'
})
export class WrestlerAddComponent {
  wrestlerForm: FormGroup;

  constructor(private fb: FormBuilder, private wrestlerService: WrestlerService) {
    this.wrestlerForm = this.fb.group({
      fio: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      gender: ['', Validators.required],
      trainer: ['', Validators.required],
      startOfCareer: ['', Validators.required],
      retired: ['false', Validators.required],
      picture: ['']
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.wrestlerForm.patchValue({
          picture: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  submitWrestler() {
    if (this.wrestlerForm.valid) {
      this.wrestlerService.createWrestler(this.wrestlerForm.value).subscribe();
    } else {
      console.error('Форма невалидна. Проверьте все поля.');
    }
  }
}
