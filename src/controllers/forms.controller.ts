import { Controller, Route, Security, Get, SuccessResponse, Tags, Query, Request, Post, Body, Put, Path } from 'tsoa';
import HttpStatus from 'http-status-codes';
import * as CivicPlus from '@oneblink/sdk/tenants/civicplus';
import {IJsonResponseSuccess} from '../types/general';
import {IFormCreationParam, IFormUpdateParam} from "../types/form"
 
@Tags('Forms')
@Route('civicplus/forms')
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
    @Get('search')
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
     * Get form by id
     * @path {number} id - Required
     */
    @Get('{id}')
    @SuccessResponse(HttpStatus.OK, 'Return array of forms')
    async getForm(
        @Path('id') id:number
    ):Promise<IJsonResponseSuccess<any>>{
        const result = await this.Forms.getForm(id, false);
        return this.successResponse({data: result})
    }

    /**
     * Create a new form
     * @param {string} name - Optional
     */
    @Post('create')
    @SuccessResponse(HttpStatus.OK, 'Return array of forms')
    async createForm(
        @Body() bodyParam: IFormCreationParam
    ):Promise<IJsonResponseSuccess<any>>{
        
        const result = await this.Forms.createForm(bodyParam);
        return this.successResponse({data: result})
    }

    /**
     * Create a new form
     * @param {string} name - Optional
     */
    @Put('update')
    @SuccessResponse(HttpStatus.OK, 'Return array of forms')
    async updateForm(
        @Body() bodyParam: IFormUpdateParam
    ):Promise<IJsonResponseSuccess<any>>{
        const result = await this.Forms.updateForm(bodyParam, true);
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