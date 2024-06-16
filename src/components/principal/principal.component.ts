import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { Carrusel } from '../../interfaces/Customer';
import { Subscription } from 'rxjs';
import { AppserviceService } from '../../service/appservice.service';
import { ColorserviceService } from '../../service/colorservice.service';
@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterOutlet, RouterLink, GalleriaModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent {
  @ViewChild('menuBtn') menuBtn!: ElementRef;
  @ViewChild('nav') nav!: ElementRef;
  @ViewChild('galeria') gallery!: ElementRef;
  navhidden = true;
  images = [
    {
      itemImageSrc: '../../assets/images/background/profile-cover.jpg',
      thumbnailImageSrc: 'url1',
    },
    {
      itemImageSrc: '../../assets/images/background/unlimited-bg.png',
      thumbnailImageSrc: 'url2',
    },
    {
      itemImageSrc: '../../assets/images/servicesImg/servicio1.jpg',
      thumbnailImageSrc: 'url3',
    },
    {
      itemImageSrc: '../../assets/images/servicesImg/servicio2.jpg',
      thumbnailImageSrc: 'url4',
    },
  ];
  private serviceColor = inject(ColorserviceService);
  private subscription: Subscription;

  principalUserColor = '';
  secundaryUserColor = '';
  neutralBUserColor = '';
  neutralWUserColor = '';
  complementUserColor = '';
  paragraphSizeUser = '';
  subtitleSizeUser = '';
  titleSizeUser = '';

  constructor(private service: AppserviceService) {}

  newNeutralWColor: string = '';
  newComplementColor: string = '';
  newParagraphSizeUser: string = '';
  newSubtitleSizeUser: string = '';
  newTitleSizeUser: string = '';
  ngOnInit() {
    this.subscription = this.serviceColor
      .obtenerDatos('newPrincipalColor')
      .subscribe((color) => {
        this.principalUserColor = color;
      });

    this.subscription = this.serviceColor
      .obtenerDatos('newSecundaryColor')
      .subscribe((color) => {
        this.secundaryUserColor = color;
      });
    this.subscription = this.serviceColor
      .obtenerDatos('newNeutralBColor')
      .subscribe((color) => {
        this.neutralBUserColor = color;
      });
    this.subscription = this.serviceColor
      .obtenerDatos('newNeutralWColor')
      .subscribe((color) => {
        this.neutralWUserColor = color;
      });
    this.subscription = this.serviceColor
      .obtenerDatos('newComplementColor')
      .subscribe((color) => {
        this.complementUserColor = color;
      });
    this.subscription = this.serviceColor
      .obtenerDatos('newParagraphSizeUser')
      .subscribe((color) => {
        this.paragraphSizeUser = color + 'px';
      });
    this.subscription = this.serviceColor
      .obtenerDatos('newSubtitleSizeUser')
      .subscribe((color) => {
        this.subtitleSizeUser = color + 'px';
      });
    this.subscription = this.serviceColor
      .obtenerDatos('newTitleSizeUser')
      .subscribe((color) => {
        this.titleSizeUser = color + 'px';
      });
  }
  ngAfterViewInit() {
    const menuButton = this.menuBtn.nativeElement;
    const navigation = this.nav.nativeElement;
    const gal = this.gallery.nativeElement;

    menuButton.addEventListener('click', () => {
      navigation.classList.toggle('hidden');
      menuButton.classList.toggle('close');
      gal.classList.toggle('hidden');
      /*       this.navhidden = false; */
    });
  }
}
