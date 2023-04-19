import { Controller, Route, Security, Get, SuccessResponse, Tags, Query, Request, Post, Body, Deprecated } from 'tsoa';
import HttpStatus from 'http-status-codes';
import * as CivicPlus from '@oneblink/sdk/tenants/civicplus';
import {IJsonResponseSuccess} from '../types/general'
 
@Tags('Forms')
@Route('civicplus')
export class FormsController extends Controller {
    Forms: CivicPlus.Forms
    constructor() {
        super();
        
        const options = {
            accessKey: process.env.CIVIC_PLUS_KEY_ID ?? '',
            secretKey: process.env.CIVIC_PLUS_KEY_SECRET ?? '',
        }
        
        //Initialize Forms class
        this.Forms = new CivicPlus.Forms(options);
    }

    /**
     * Search forms
     * @param {string} name - Optional
     */
    @Get('forms')
    @SuccessResponse(HttpStatus.OK, 'Return array of forms')
    async searchForms(
        @Query('name') name?:string
    ):Promise<IJsonResponseSuccess<any>>{
        
        const searchQuery = {
            name: 'Santiago Test',
            limit: 100,
            offset:0
        }
        const result = await this.Forms.searchForms(searchQuery);
        return this.successResponse({data: result})
    }

    /**
     * Success Response
     *
     * @param param0
     * @returns
     */
    successResponse = <T = any>({
        status = HttpStatus.OK,
        message,
        data,
    }: {
        status?: number;
        message?: string;
        data?: T;
    } = {}): IJsonResponseSuccess<T> => {
        return {
            status,
            ...(message?{message}:{}),
            ...(data ? { data } : {}),
        };
    };
}