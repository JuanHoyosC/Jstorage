import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';  
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
    imports: [ MatToolbarModule,MatMenuModule, MatButtonModule, 
        MatIconModule, MatSidenavModule, DragDropModule, MatGridListModule, MatSnackBarModule, 
        MatExpansionModule, MatProgressSpinnerModule, MatDialogModule, MatFormFieldModule, MatProgressBarModule],

    exports: [ MatToolbarModule, MatMenuModule, MatButtonModule, 
        MatIconModule, MatSidenavModule, DragDropModule, MatGridListModule, MatSnackBarModule, 
        MatExpansionModule, MatProgressSpinnerModule, MatDialogModule, MatFormFieldModule, MatProgressBarModule]
})
export class MaterialModule {}