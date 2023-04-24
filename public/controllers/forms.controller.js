"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsController = void 0;
const tsoa_1 = require("tsoa");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const CivicPlus = __importStar(require("@oneblink/sdk/tenants/civicplus"));
let FormsController = class FormsController extends tsoa_1.Controller {
    constructor() {
        var _a, _b;
        super();
        /**
         * Success Response
         *
         * @param param0
         * @returns
         */
        this.renderResponse = ({ status = http_status_codes_1.default.OK, message, data, error } = {}) => {
            return Object.assign(Object.assign(Object.assign({ status }, (message ? { message } : {})), (data ? { data } : {})), (error ? { error } : {}));
        };
        const options = {
            accessKey: (_a = process.env.CIVIC_PLUS_KEY_ID) !== null && _a !== void 0 ? _a : '',
            secretKey: (_b = process.env.CIVIC_PLUS_KEY_SECRET) !== null && _b !== void 0 ? _b : '',
        };
        //Initialize Forms class
        this.Forms = new CivicPlus.Forms(options);
    }
    /**
     * Search forms
     * @param {string} name - Optional
     */
    searchForms(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchQuery = {
                name: 'Santiago Test',
                limit: 100,
                offset: 0
            };
            const result = yield this.Forms.searchForms(searchQuery);
            return this.renderResponse({ data: result });
        });
    }
    /**
     * Get form by id
     * @path {number} id - Required
     */
    getForm(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.Forms.getForm(id, false);
            return this.renderResponse({ data: result });
        });
    }
    /**
     * Create a new form
     * @param {string} name - Optional
     */
    createForm(bodyParam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.Forms.createForm(bodyParam);
                return this.renderResponse({ data: result });
            }
            catch (error) {
                return this.renderResponse({ error, status: http_status_codes_1.default.BAD_REQUEST });
            }
        });
    }
    /**
     * Update a new form
     * @param {string} name - Optional
     */
    updateForm(bodyParam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.Forms.updateForm(bodyParam);
                return this.renderResponse({ data: result });
            }
            catch (error) {
                return this.renderResponse({ error, status: http_status_codes_1.default.BAD_REQUEST });
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Get)('search'),
    (0, tsoa_1.SuccessResponse)(http_status_codes_1.default.OK, 'Return array of forms'),
    __param(0, (0, tsoa_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "searchForms", null);
__decorate([
    (0, tsoa_1.Get)('{id}'),
    (0, tsoa_1.SuccessResponse)(http_status_codes_1.default.OK, 'Return array of forms'),
    __param(0, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "getForm", null);
__decorate([
    (0, tsoa_1.Post)('create'),
    (0, tsoa_1.SuccessResponse)(http_status_codes_1.default.OK, 'Return array of forms'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "createForm", null);
__decorate([
    (0, tsoa_1.Put)('update'),
    (0, tsoa_1.SuccessResponse)(http_status_codes_1.default.OK, 'Return array of forms'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "updateForm", null);
FormsController = __decorate([
    (0, tsoa_1.Tags)('Forms'),
    (0, tsoa_1.Route)('civicplus/forms'),
    __metadata("design:paramtypes", [])
], FormsController);
exports.FormsController = FormsController;
