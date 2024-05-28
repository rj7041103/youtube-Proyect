import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scheme } from '../interfaces/ColorInterface';
import { BehaviorSubject, Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ColorserviceService {
  API_ColorT: string =
    'https://www.thecolorapi.com/scheme?hex=3949AB&mode=triad&count=5';

  API_ColorM: string =
    'https://www.thecolorapi.com/scheme?hex=3949AB&mode=monochrome&count=5';

  API_ColorC: string =
    'https://www.thecolorapi.com/scheme?hex=3949AB&mode=analogic&count=5';

  //state of pallet
  typePalletColor: string = '';

  //new colors selected in user's interface
  newPrincipalColor: string = '#7909DB';
  newSecundaryColor: string = '#5F3286';
  newNeutralBColor: string = '#171E26';
  newNeutralWColor: string = '#F2F2F2';
  newComplementColor: string = '#DB8B09';
  newParagraphSizeUser: string = '12px';
  newSubtitleSizeUser: string = '18px';
  newTitleSizeUser: string = '24px';

  //new colors selected in dashboard's interface
  newPrincipalColorDashboard: string = '';
  newSecundaryColorDashboard: string = '';
  newBtnBgColorFormDashboard: string = '';
  fontColorDashboard: string = '';
  newBtnFontColorFormDashboard: string = '';
  newParagraphSizeDashboard: string = '';
  newSubtitleSizeDashboard: string = '';
  newTitleSizeDashboard: string = '';

  triad = {
    principal: '#7909DB',
    secundary: '#5F3286',
    neutralB: '#171E26',
    neutralW: '#F2F2F2',
    complement: '#DB8B09',
  };

  monochrome = {
    principal: '#7909DB',
    secundary: '#372A42',
    neutralB: '#171E26',
    neutralW: '#F2F2F2',
    complement: '#6D28A8',
  };

  analogic = {
    principal: '#7909DB',
    secundary: '#5267D9',
    neutralB: '#171E26',
    neutralW: '#F2F2F2',
    complement: '#DB0993',
  };

  setPalletColorT(
    newPrincipalColor: string,
    newSecundaryColor: string,
    newNeutralBColor: string,
    newNeutralWColor: string,
    newComplementColor: string,
  ) {
    this.triad.principal = newPrincipalColor;
    this.triad.secundary = newSecundaryColor;
    this.triad.neutralB = newNeutralBColor;
    this.triad.neutralW = newNeutralWColor;
    this.triad.complement = newComplementColor;
    this.newPrincipalColor = newPrincipalColor;
    this.newSecundaryColor = newSecundaryColor;
    this.newNeutralBColor = newNeutralBColor;
    this.newNeutralWColor = newNeutralWColor;
    this.newComplementColor = newComplementColor;
  }
  setPalletColorM(
    newPrincipalColor: string,
    newSecundaryColor: string,
    newNeutralBColor: string,
    newNeutralWColor: string,
    newComplementColor: string,
  ) {
    this.monochrome.principal = newPrincipalColor;
    this.monochrome.secundary = newSecundaryColor;
    this.monochrome.neutralB = newNeutralBColor;
    this.monochrome.neutralW = newNeutralWColor;
    this.monochrome.complement = newComplementColor;
    this.newPrincipalColor = newPrincipalColor;
    this.newSecundaryColor = newSecundaryColor;
    this.newNeutralBColor = newNeutralBColor;
    this.newNeutralWColor = newNeutralWColor;
    this.newComplementColor = newComplementColor;
  }
  setPalletColorA(
    newPrincipalColor: string,
    newSecundaryColor: string,
    newNeutralBColor: string,
    newNeutralWColor: string,
    newComplementColor: string,
  ) {
    this.analogic.principal = newPrincipalColor;
    this.analogic.secundary = newSecundaryColor;
    this.analogic.neutralB = newNeutralBColor;
    this.analogic.neutralW = newNeutralWColor;
    this.analogic.complement = newComplementColor;
    this.newPrincipalColor = newPrincipalColor;
    this.newSecundaryColor = newSecundaryColor;
    this.newNeutralBColor = newNeutralBColor;
    this.newNeutralWColor = newNeutralWColor;
    this.newComplementColor = newComplementColor;
  }

  constructor(private serviceColor: HttpClient) {}

  getColorsT(): Observable<Scheme[]> {
    return this.serviceColor
      .get<Scheme[]>(this.API_ColorT)
      .pipe(map((res) => res));
  }

  getColorsM(): Observable<Scheme[]> {
    return this.serviceColor
      .get<Scheme[]>(this.API_ColorM)
      .pipe(map((res) => res));
  }

  getColorsC(): Observable<Scheme[]> {
    return this.serviceColor
      .get<Scheme[]>(this.API_ColorC)
      .pipe(map((res) => res));
  }
}
