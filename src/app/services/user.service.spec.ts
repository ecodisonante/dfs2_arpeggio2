import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, provideHttpClient } from '@angular/common/http';

describe('UserService', () => {
    let service: UserService;
    let httpSpy: jasmine.SpyObj<HttpClient>;
    let storageSpy: jasmine.SpyObj<StorageService>;

    let user1: User;
    let user2: User;
    let existingUsers: User[];

    // let storage: StorageService;

    beforeEach(() => {
        user1 = new User("test1", "Testing Name 1", "Testing ApePat 1", "Testing ApeMat 1", "Testing Address 1", "testing1@email.com", "Testing1.Passw0rd", true, false, undefined);
        user2 = new User("test2", "Testing Name 2", "Testing ApePat 2", "Testing ApeMat 2", "Testing Address 2", "testing2@email.com", "Testing2.Passw0rd", true, false, undefined);
        existingUsers = [user1, user2];

        let spyStorage = jasmine.createSpyObj('StorageService', ['getItem', 'setItem']);
        let spyHttp = jasmine.createSpyObj('HttpClient', ['get', 'post']);

        TestBed.configureTestingModule({
            providers: [
                UserService,
                { provide: HttpClient, useValue: spyHttp },
                { provide: StorageService, useValue: spyStorage },
            ]
        });

        service = TestBed.inject(UserService);
        httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
        storageSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return complete users list', () => {
        //given
        const observableList = new BehaviorSubject<User[]>(existingUsers);
        //when
        httpSpy.get.and.returnValue(observableList.asObservable());
        //then
        service.getUserList().subscribe(result => { expect(result).toEqual(existingUsers); });
    });


    it('should log in user correctly', () => {
        //given
        storageSpy.getItem.and.returnValue(JSON.stringify(user1));
        //when
        service.logIn(user1);
        //then
        expect(storageSpy.setItem).toHaveBeenCalledWith('authUser', JSON.stringify(user1));
    });


    it('should find user by username and password', () => {
        //given
        const observableList = new BehaviorSubject<User[]>(existingUsers);
        spyOn(service, 'getUserList').and.returnValue(observableList);

        //when credentials are ok
        service.findUser(user1.username, user1.password).subscribe(result => {
            //then
            expect(result).toEqual(user1);
        });

        //when credentials are wrong
        service.findUser(user1.username, "badPassword").subscribe(result => {
            //then
            expect(result).toEqual(undefined);
        });
    });


    it('should add user', () => {
        //given
        let user3 = new User("test3", "Testing Name 3", "Testing ApePat 3", "Testing ApeMat 3", "Testing Address 3", "testing3@email.com", "Testing3.Passw0rd", true, true, undefined);
        const observableList = new BehaviorSubject<User[]>(existingUsers);
        spyOn(service, 'getUserList').and.returnValue(observableList);
        httpSpy.post.and.returnValue(observableList.asObservable());

        let userUrl: string = 'https://firebasestorage.googleapis.com/v0/b/dfs2-1f652.appspot.com/o/arpeggio%2Fuser.json?alt=media&token=4afef7b7-3ab9-44c3-be4a-ff0c1ea4365b';
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 4afef7b7-3ab9-44c3-be4a-ff0c1ea4365b'
            })
        }

        //when
        service.addUser(user3).subscribe(result => {
            //then
            expect(result).toBe(true);
            expect(httpSpy.post).toHaveBeenCalledWith(userUrl, existingUsers, httpOptions);
        });
    });


    it('should find user by username and email', () => {
        //given
        const observableList = new BehaviorSubject<User[]>(existingUsers);
        spyOn(service, 'getUserList').and.returnValue(observableList);

        //when credentials are ok
        service.findUserByEmail(user1.username, user1.email).subscribe(result => {
            //then
            expect(result).toEqual(user1);
        });

        //when credentials are wrong
        service.findUser(user1.username, "badEmail").subscribe(result => {
            //then
            expect(result).toEqual(undefined);
        });
    });


    it('should return active user', () => {
        //when no active user then
        expect(service.getActiveUser()).toBeFalsy();

        //given when ok
        storageSpy.getItem.and.returnValue(JSON.stringify(user1));
        //then
        expect(service.getActiveUser()).toBeTruthy();
    });

});

