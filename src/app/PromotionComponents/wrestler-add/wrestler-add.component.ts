import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {WrestlerService} from '../../Service/Wrestler.service';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(private fb: FormBuilder, private wrestlerService: WrestlerService, private route: ActivatedRoute, private router: Router) {
    let promoId;
    this.route.paramMap.subscribe(params => {
      promoId = params.get('id');
    });
    this.wrestlerForm = this.fb.group({
      fio: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      gender: ['', Validators.required],
      trainer: ['', Validators.required],
      startOfCareer: ['', Validators.required],
      retired: ['false', Validators.required],
      picture: [''],
      promotionId: promoId
    });
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files.item(0);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const base64Image = e.target?.result?.toString().split(',')[1];
          if (base64Image) {
            this.wrestlerForm.value.picture = base64Image;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  submitWrestler() {
    if (this.wrestlerForm.valid) {
      this.wrestlerService.createWrestler(this.wrestlerForm.value).subscribe();
      this.router.navigate(['wrestlers']).then();
    } else {
      console.error('Форма невалидна. Проверьте все поля.');
    }
  }
}
