import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scheme } from '../interfaces/ColorInterface';
import { BehaviorSubject, Observable, map, catchError, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  /*  newPrincipalColor: string = '#7909DB';
  newSecundaryColor: string = '#5F3286';
  newNeutralBColor: string = '#171E26';
  newNeutralWColor: string = '#F2F2F2';
  newComplementColor: string = '#DB8B09';
  newParagraphSizeUser: string = '14px';
  newSubtitleSizeUser: string = '23.52px';
  newTitleSizeUser: string = '39.52px'; */
  newPrincipalColor: string = '';
  newSecundaryColor: string = '';
  newNeutralBColor: string = '';
  newNeutralWColor: string = '';
  newComplementColor: string = '';
  newParagraphSizeUser: string = '';
  newSubtitleSizeUser: string = '';
  newTitleSizeUser: string = '';

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

  constructor(
    private serviceColor: HttpClient,
    private firestore: AngularFirestore,
  ) {}

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

  obtenerDatos(colorKey: string): Observable<string | null> {
    console.log(`Intentando obtener el color ${colorKey}...`);
    return this.firestore
      .collection('dbUserColor')
      .valueChanges()
      .pipe(
        map((documents) => {
          if (documents.length > 0) {
            const document: any = documents[1]; // Accede al primer (y único) documento en el array
            // Busca la propiedad especificada por colorKey en el documento
            const colorValue = document[colorKey];
            if (colorValue !== undefined) {
              console.log(`${colorKey}: ${colorValue}`);
              return colorValue; // Retorna el valor del color especificado
            } else {
              console.log(`No se encontró el color ${colorKey}.`);
              return null; // Retorna null si la clave no se encuentra
            }
          } else {
            console.log('No se encontraron documentos.');
            return null; // Retorna null si no hay documentos
          }
        }),
        catchError((error) => {
          console.error('Error obteniendo datos:', error);
          return of(null); // Retorna null en caso de error
        }),
      );
  }

  getDataDashboard(colorKey: string): Observable<string | null> {
    console.log(`Intentando obtener el color ${colorKey}...`);
    return this.firestore
      .collection('dbUserColor')
      .valueChanges()
      .pipe(
        map((documents) => {
          if (documents.length > 0) {
            const document: any = documents[0]; // Accede al primer (y único) documento en el array
            // Busca la propiedad especificada por colorKey en el documento
            const colorValue = document[colorKey];
            if (colorValue !== undefined) {
              console.log(`${colorKey}: ${colorValue}`);
              return colorValue; // Retorna el valor del color especificado
            } else {
              console.log(`No se encontró el color ${colorKey}.`);
              return null; // Retorna null si la clave no se encuentra
            }
          } else {
            console.log('No se encontraron documentos.');
            return null; // Retorna null si no hay documentos
          }
        }),
        catchError((error) => {
          console.error('Error obteniendo datos:', error);
          return of(null); // Retorna null en caso de error
        }),
      );
  }

  // En ColorserviceService

  updateUserColors(
    newPrincipalColor: string,
    newSecundaryColor: string,
    newNeutralBColor: string,
    newNeutralWColor: string,
    newComplementColor: string,
    newParagraphSizeUser: string,
    newSubtitleSizeUser: string,
    newTitleSizeUser: string,
  ): void {
    const userRef = this.firestore
      .collection('dbUserColor')
      .doc('userPalletColor');

    userRef
      .update({
        newPrincipalColor: newPrincipalColor,
        newSecundaryColor: newSecundaryColor,
        newNeutralBColor: newNeutralBColor,
        newNeutralWColor: newNeutralWColor,
        newComplementColor: newComplementColor,
        newParagraphSizeUser: newParagraphSizeUser,
        newSubtitleSizeUser: newSubtitleSizeUser,
        newTitleSizeUser: newTitleSizeUser,
      })
      .then(() => {
        console.log('Colores del usuario actualizados exitosamente');
      })
      .catch((error) => {
        console.error('Error al actualizar los colores del usuario:', error);
      });
  }

  updateDashboardColors(
    principalColorDashboard: string,
    secundaryColorDashboard: string,
    fontColorDashboard: string,
    btnBgDashboardForm: string,
    fontColorBtnDashboardForm: string,
    fontSizeParagraph: string,
    fontSizeSubtitle: string,
    fontSizeTitle: string,
  ): void {
    const userRef = this.firestore
      .collection('dbUserColor')
      .doc('dashboardPalletColor');

    userRef
      .update({
        principalColorDashboard: principalColorDashboard,
        secundaryColorDashboard: secundaryColorDashboard,
        fontColorDashboard: fontColorDashboard,
        btnBgDashboardForm: btnBgDashboardForm,
        fontColorBtnDashboardForm: fontColorBtnDashboardForm,
        fontSizeParagraph: fontSizeParagraph,
        fontSizeSubtitle: fontSizeSubtitle,
        fontSizeTitle: fontSizeTitle,
      })
      .then(() => {
        console.log('Colores del dashboard actualizados exitosamente');
      })
      .catch((error) => {
        console.error('Error al actualizar los colores del dashboard:', error);
      });
  }
}
