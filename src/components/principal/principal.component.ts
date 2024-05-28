import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { Carrusel } from '../../interfaces/Customer';
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
  ];
  private serviceColor = inject(ColorserviceService);
  principalUserColor = this.serviceColor.newPrincipalColor;
  secundaryUserColor = this.serviceColor.newSecundaryColor;
  neutralBUserColor = this.serviceColor.newNeutralBColor;
  neutralWUserColor = this.serviceColor.newNeutralWColor;
  complementUserColor = this.serviceColor.newComplementColor;
  paragraphSizeUser = this.serviceColor.newParagraphSizeUser;
  subtitleSizeUser = this.serviceColor.newSubtitleSizeUser;
  titleSizeUser = this.serviceColor.newTitleSizeUser;

  constructor(private service: AppserviceService) {}

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
