import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { NotificationDTO } from "../models/notification.model";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private httpClient = inject(HttpClient);
    private url = 'http://localhost:8080/notification/';

    getTransactions() {
        return this.httpClient.get<NotificationDTO[]>(this.url + 'notifications');
    }

}