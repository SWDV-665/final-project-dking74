import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { PageComponent } from '@components/page/page.component';
import { HeaderComponent } from '@components/header/header.component';
import { TabsComponent } from '@components/tabs/tabs.component';
import { AccountMenuComponent} from '@components/account-menu/account-menu.component';
import { CountdownComponent } from '@components/countdown/countdown.component';

import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
    imports: [ CommonModule, IonicModule, NgCircleProgressModule.forRoot({}) ],
    declarations: [
        PageComponent,
        AccountMenuComponent,
        HeaderComponent,
        TabsComponent,
        CountdownComponent,
    ],
    exports:[
        CommonModule,
        IonicModule,
        NgCircleProgressModule,
        PageComponent,
        AccountMenuComponent,
        HeaderComponent,
        TabsComponent,
        CountdownComponent,
    ],
})
export class SharedModule { }