import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar, MatCheckboxChange, MatOptionSelectionChange } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from "@angular/router";
import { AgrupamentoService } from '../../../../services/agrupamento.service';
import { FiltrosService } from '../../../../services/filtros.service';
import { DeleteAtributoDialogComponent } from '../../atributo/delete-atributo-dialog/delete-atributo-dialog.component';
import { SkuDialogComponent } from '../../skus/sku-dialog/sku-dialog.component';
import { DeleteSkuDialogComponent } from '../../skus/delete-sku-dialog/delete-sku-dialog.component';
import { DeleteAgrupamentosCorrelatosDialogComponent } from '../delete-agrupamentos-correlatos-dialog/delete-agrupamentos-correlatos-dialog.component';
import { fuseAnimations } from './../../../../../../@fuse/animations/index';
import { BaseComponent } from './../../../../../util/base-component';
import { AgrupamentoModel } from './../../../../models/agrupamento-model';
import { AgrupamentosCorrelatosModel } from './../../../../models/agrupamentos-correlatos-model';
import { AtributoModel } from './../../../../models/atributo-model';
import { RespostaModel } from './../../../../models/resposta-model';
import { SkusModel } from './../../../../models/sku-model';
import { AtributoService } from './../../../../services/atributo.service';
import { AtributoFormDialogComponent } from './../../atributo/atributo-form-dialog/atributo-form-dialog.component';
import { AgrupamentoCorrelatosDialogComponent } from './../agrupamento-correlatos-dialog/agrupamento-correlatos-dialog.component';
import * as _ from 'lodash';
import { EditRespostasSkuDialogComponent } from '../../skus/edit-respostas-sku-dialog/edit-respostas-sku-dialog.component';
import { AgrupamentosCorrelatosService } from '../../../../services/agrupamentos-correlatos.service';

@Component({
    selector: 'app-agrupamento-form',
    templateUrl: './agrupamento-form.component.html',
    styleUrls: ['./agrupamento-form.component.scss'],
    animations: fuseAnimations
})
export class AgrupamentoFormComponent extends BaseComponent implements OnInit {
    @ViewChild('matTableSKU', { static: true }) matTableSKU: ElementRef;

    displayedAtributosColumns: string[] = ['nomeAtributo', 'prioritario', 'acoes'];
    dataSourceAtributos: MatTableDataSource<AtributoModel>;

    displayedColumns = ['nomeAgrupamento', 'prioritario', 'sugerido', 'acoes'];
    dataSource: MatTableDataSource<AgrupamentosCorrelatosModel>;

    agrupamentoDetail: any;
    skus: any = [];
    agrupamentosCorrelatos: any;
    atributos: any;
    dialogRef: any;
    noResult: boolean;
    length: number;
    agrupamentoDetailId = this.route.snapshot.params.id;
    showSku = true;
    hasAtributos = false;
    atributosLength: number;
    hasAgrupamentos = false;
    showAtributosAgrupamentoSku = false;
    respostaSelecionada: any;
    hideRespostaSelecionada = false;
    hasSkus = false;
    departamentos: any[];
    categorias: any[];
    subCategorias: any[];
    segmentos: any[];
    subSegmentos: any[];
    alphabet: any;
    searched = false;
    skusBuscados: any;
    atributosRespostas = [];
    atributosRespostasSelecionadas = [];
    codigosAtributosRespostasSelecionadas = [];
    checked = false;
    checkedSkus = [];
    checkedSkuCodigo = [];
    emptySearch = false;
    showExcluirSKU = false;
    noPagination: boolean = false;
    noPaginationSearched: boolean = false;
    showCollapseSku = false;
    enableMessage = false;
    totalFitrados: number = 0;
    totalProdutos: number = 0;
    mouseEnterTableSku = false;
    atributosVinculados: any;
    public agrupamento: AgrupamentoModel;
    public resposta: RespostaModel;

    form = new FormGroup({
        id: new FormControl(),
        nome: new FormControl("", [
            Validators.required,
            Validators.maxLength(60)
        ]),
        ativo: new FormControl(true),
        podeSugerir: new FormControl(true)
    });

    filters = new FormGroup({
        nomeSku: new FormControl(),
        letraSku: new FormControl(),
        departamentoSku: new FormControl(),
        categoriaSku: new FormControl(),
        subCategoriaSku: new FormControl(),
        segmentoSku: new FormControl(),
        subSegmentoSku: new FormControl(),
    });

    pageSku: SkusModel;
    selectedPage: number = 1;
    selectedPageSearchSku: number = 1;

    atributoBuscado = '';

    displayedSKUColumns: string[] = [];
    dataSourceSKU;

    constructor(
        private route: ActivatedRoute,
        private _matDialog: MatDialog,
        private atributoService: AtributoService,
        private agrupamentoService: AgrupamentoService,
        private agrupamentoCorrelatoService: AgrupamentosCorrelatosService,
        private router: Router,
        private _snackBar: MatSnackBar,
        private filtrosService: FiltrosService,
    ) {
        super();
    }

    ngOnInit() {
        if (this.agrupamentoDetailId) {
            this.getAgrupamentoCabecalho();
            this.getAtributos();
            this.getAgrupamentosCorrelatos();
            this.getDepartamentos();
            this.getAtributosRespostas();
            this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
            this.filters.get('categoriaSku').disable();
            this.filters.get('subCategoriaSku').disable();
            this.filters.get('segmentoSku').disable();
            this.filters.get('subSegmentoSku').disable();
            window.addEventListener('scroll', this.onScrollPagination.bind(this), true);
        }
    }

    mostraCollapseSku() {
        this.showCollapseSku = !this.showCollapseSku;
    }


    getAgrupamentoCabecalho() {
        const form = this.form;
        const url = this.route.snapshot.routeConfig.path;
        this.displayedSKUColumns = ['checkbox', 'edit', 'name'];
        if (url !== "agrupamento/novo") {
            this.agrupamentoDetail = true;
            this.showAtributosAgrupamentoSku = true;
            this.agrupamentoService.getAgrupamentoCabecalho(this.agrupamentoDetailId).subscribe((response) => {
                this.agrupamentoDetail = response.data;
                form.get('nome').setValue(this.agrupamentoDetail ? this.agrupamentoDetail.nome : '');
                form.get('ativo').setValue(this.agrupamentoDetail ? this.agrupamentoDetail.ativo : true);
                form.get('podeSugerir').setValue(this.agrupamentoDetail ? this.agrupamentoDetail.sugerido : true);
            })
        }
    }

    getAtributos() {
        this.atributoService.getAtributos(this.agrupamentoDetailId).subscribe((response) => {
            this.atributos = response.data;
            this.atributosVinculados = response.data;
            if (this.atributos) {
                this.hasAtributos = true;
                this.dataSourceAtributos = new MatTableDataSource(this.atributos);
                this.getAtributosRespostas();
                this.getSkus();
            } else {
                this.hasAtributos = false;
                this.noResult = true
            }
        });
    }

    getAtributosRespostas() {
        this.agrupamentoService.getAtributosRespostas(this.agrupamentoDetailId).subscribe((response) => {
            this.atributosRespostas = response.data;
        });
    }

    getAgrupamentosCorrelatos() {
        this.agrupamentoService.getAgrupamentosCorrelatos(this.agrupamentoDetailId).subscribe((response) => {
            this.agrupamentosCorrelatos = response.data;
            if (this.agrupamentosCorrelatos.length > 0) {
                this.hasAgrupamentos = true;
                this.dataSource = new MatTableDataSource(this.agrupamentosCorrelatos);
            } else {
                this.hasAgrupamentos = false;
            }
        });
    }

    getSkus() {
        if (this.noPagination)
            return;

        this.agrupamentoService.getSkus(this.agrupamentoDetailId, this.selectedPage).subscribe((response) => {
            this.searched = false;
            this.hasSkus = true;
            this.skus = this.skus.length > 0 ? [...this.skus, ...response.data] : response.data;
            if (response.data.length <= 0) {
                this.noPagination = true;
                if (this.selectedPage === 1) {
                    this.hasSkus = false;
                }
                return;
            }
            this.dataSourceSKU = new MatTableDataSource(this.skus);
            if (this.atributosRespostas) {
                for (let atributo of this.atributosRespostas) {
                    const lista = this.displayedSKUColumns.find((item => item === atributo.nome));
                    if (lista !== atributo.nome) {
                        this.displayedSKUColumns.push(atributo.nome);
                    }
                }
            }
        })

    }

    onScrollPagination(event) {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight && this.mouseEnterTableSku) {
            if (event.target.className === 'table-skus') {
                if (!this.searched) {
                    this.nextPage();
                } else if (!this.enableMessage) {
                    this.nextPageSearch();
                }
            }
        }
    }

    mouseEnterTableSkus() {
        this.mouseEnterTableSku = true;
    }

    mouseLeaveTableSkus() {
        this.mouseEnterTableSku = false;
    }

    nextPage(): void {
        this.selectedPage = this.selectedPage + 1;
        this.getSkus();
    }

    newEditAtributo(atributo?) {
        this.dialogRef = this._matDialog.open(AtributoFormDialogComponent, {
            panelClass: 'contact-form-dialog-atributo',
            data: {
                codigo: this.agrupamentoDetailId ? this.agrupamentoDetailId : 0,
                action: atributo ? 'edit' : 'new',
                atributo: atributo ? atributo : '',
                nomeAgrupamento: this.form.get('nome').value,
                ativo: this.form.get('ativo').value,
                sugerido: this.form.get('podeSugerir').value,
                atributos: this.atributosVinculados ? this.atributosVinculados : [],
                agrupamentosCorrelatos: this.agrupamentosCorrelatos ? this.agrupamentosCorrelatos : [],
                produtos: this.skus ? this.skus : []
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response) => {
                setTimeout(() => {
                    this.skus = [];
                    this.getAgrupamentoCabecalho();
                    this.getAtributos();
                }, 900);

            });
    }

    filtrarAtributo() {
        const removeEspaco = this.atributoBuscado.trim();
        if (removeEspaco.length > 0) {
            this.atributoService.filtrarAtributos(this.agrupamentoDetailId, this.atributoBuscado).subscribe((response) => {
                this.atributos = response.data;
                this.dataSourceAtributos = new MatTableDataSource(this.atributos);
                this.atributos.length > 0 ? this.hasAtributos = true : this.hasAtributos = false
            });
        } else {
            this._snackBar.open('Preencha o campo para efetuar a busca!', '', { duration: 3000 });
        }
    }

    limparAtributo() {
        this.atributoBuscado = null;
        this.getAtributos();
    }

    aumentarPrioridadeAtributo(atributo) {
        this.atributoService.editarPrioridade(atributo, true).subscribe((response) => {
            if (response.code === 200) {
                this.getAtributos();
            } else {
                this._snackBar.open('Não foi possivel editar a prioridade do atributo, entre em contato com o Administrador do Sistema', '', { duration: 3000 });
            }
        });

    }

    diminuirPrioridadeAtributo(atributo) {
        this.atributoService.editarPrioridade(atributo, false).subscribe((response) => {
            if (response.code === 200) {
                this.getAtributos();
            } else {
                this._snackBar.open('Não foi possivel editar a prioridade do atributo, entre em contato com o Administrador do Sistema', '', { duration: 3000 });
            }
        });
    }

    removeAtributo(atributo) {
        this.dialogRef = this._matDialog.open(DeleteAtributoDialogComponent, {
            panelClass: 'delete-contact-form-dialog',
            data: {
                atributo: atributo ? atributo : '',
                agrupamentoAtual: this.agrupamentoDetail,
                codigo: this.agrupamentoDetailId ? this.agrupamentoDetailId : 0,
                nome: this.form.get('nome').value ? this.form.get('nome').value : '',
                ativo: this.form.get('ativo').value ? this.form.get('ativo').value : true,
                sugerido: this.form.get('podeSugerir').value ? this.form.get('podeSugerir').value : true,
                atributos: this.atributos ? this.atributos : [],
                agrupamentosCorrelatos: this.agrupamentosCorrelatos ? this.agrupamentosCorrelatos : [],
                produtos: this.skus ? this.skus : []
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response) => {
                this.displayedSKUColumns = [];
                this.skus = [];
                this.getAtributos();
                this.getAgrupamentoCabecalho();
                if (!response) {
                    return;
                }
            });
    }

    newEditAgrupamento(agrupamento) {
        if (agrupamento) {
            this.router.navigate(["/agrupamento/editar/" + agrupamento.codigoAgrupamentoSKU]);
            this.agrupamentoDetailId = agrupamento.codigoAgrupamentoSKU;
            this.skus = [];
            this.noPagination = false;
            this.selectedPage = 1;
            this.getAgrupamentoCabecalho();
            this.getAtributos();
            this.getAgrupamentosCorrelatos();

        } else {
            this.dialogRef = this._matDialog.open(AgrupamentoCorrelatosDialogComponent, {
                panelClass: 'contact-form-dialog-correlatos',
                data: {
                    action: 'new',
                    agrupamentoId: this.agrupamentoDetailId ? this.agrupamentoDetailId : 0,
                    nomeAgrupamento: this.form.get('nome').value,
                    ativo: this.form.get('ativo').value,
                    sugerido: this.form.get('podeSugerir').value,
                    atributos: this.atributos ? this.atributos : [],
                    agrupamentosCorrelatos: this.agrupamentosCorrelatos ? this.agrupamentosCorrelatos : [],
                    produtos: this.skus ? this.skus : []
                }
            });

            this.dialogRef.afterClosed()
                .subscribe((response) => {
                    this.getAgrupamentosCorrelatos();
                    if (!response) {
                        return;
                    }
                });

        }
    }

    aumentarPrioridadeAgrupamento(agrupamento) {
        this.agrupamentoCorrelatoService.editarPrioridade(this.agrupamentoDetailId, true, agrupamento.codigoAgrupamentoSKU).subscribe((response) => {
            if (response.code === 200) {
                this.getAgrupamentosCorrelatos();
            } else {
                this._snackBar.open('Não foi possivel editar a prioridade do agrupamento, entre em contato com o Administrador do Sistema', '', { duration: 3000 });
            }
        });
    }

    diminuirPrioridadeAgrupamento(agrupamento) {
        this.agrupamentoCorrelatoService.editarPrioridade(this.agrupamentoDetailId, false, agrupamento.codigoAgrupamentoSKU).subscribe((response) => {
            if (response.code === 200) {
                this.getAgrupamentosCorrelatos();
            } else {
                this._snackBar.open('Não foi possivel editar a prioridade do agrupamento, entre em contato com o Administrador do Sistema', '', { duration: 3000 });
            }
        });
    }

    removeAgrupamentoCorrelato(agrupamento) {
        this.dialogRef = this._matDialog.open(DeleteAgrupamentosCorrelatosDialogComponent, {
            panelClass: 'delete-contact-form-dialog',
            data: {
                agrupamento: agrupamento ? agrupamento : '',
                agrupamentoAtual: this.agrupamentoDetail
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response) => {
                this.getAgrupamentosCorrelatos();
                if (!response) {
                    return;
                }
            });
    }

    getDepartamentos() {
        this.filtrosService.getDepartamentosPorAgrupamento(this.agrupamentoDetailId).subscribe((response) => {
            this.departamentos = response.data;
        });
    }

    limparFiltrosSku() {
        this.filters.get('nomeSku').setValue(null);
        this.filters.get('letraSku').setValue(null);
        this.filters.get('departamentoSku').setValue(null);
        this.filters.get('categoriaSku').setValue(null);
        this.filters.get('subCategoriaSku').setValue(null);
        this.filters.get('segmentoSku').setValue(null);
        this.filters.get('subSegmentoSku').setValue(null);
        this.getAtributos();
        this.noPagination = false;
        this.totalFitrados = 0;
    }

    habilitarCategorias() {
        const departamento = this.filters.get('departamentoSku').value;
        const departamentosSelecionados = [];
        departamento.forEach(element => {
            if (departamentosSelecionados.indexOf(element.codigo) === -1) {
                departamentosSelecionados.push(element.codigo);
            } else {
                departamentosSelecionados.splice(departamentosSelecionados.indexOf(element.codigo), 1);
                this.filters.get('categoriaSku').setValue(null);
                this.filters.get('subCategoriaSku').setValue(null);
                this.filters.get('segmentoSku').setValue(null);
            }
        });
        this.filtrosService.getCategoriasPorAgrupamento(departamentosSelecionados, this.agrupamentoDetailId).subscribe((response) => {
            this.categorias = response.data;
            this.filters.get('categoriaSku').enable();
        });
    }

    habilitarSubCategoria() {
        const categorias = this.filters.get('categoriaSku').value;
        let categoriaFormatada: any = [];

        if (categorias !== undefined) {
            categorias.forEach(element => {
                if (categoriaFormatada.indexOf(element.codigo) === -1) {
                    categoriaFormatada.push(element.codigo.replace(/\./g, ""));
                } else {
                    categoriaFormatada.splice(categoriaFormatada.indexOf(element.codigo), 1);
                    this.filters.get('subCategoriaSku').setValue(null);
                    this.filters.get('segmentoSku').setValue(null);
                }
            });
        }

        this.filtrosService.getSubCategoriasPorAgrupamento(categoriaFormatada, this.agrupamentoDetailId).subscribe((response) => {
            this.subCategorias = response.data;
            this.filters.get('subCategoriaSku').enable();
        });
    }

    habilitarSegmento() {
        const subCategorias = this.filters.get('subCategoriaSku').value;
        let subCategoriaFormatada: any = [];

        if (subCategorias !== undefined) {
            subCategorias.forEach(element => {
                if (subCategoriaFormatada.indexOf(element.codigo) === -1) {
                    subCategoriaFormatada.push(element.codigo.replace(/\./g, ""));
                } else {
                    subCategoriaFormatada.splice(subCategoriaFormatada.indexOf(element.codigo), 1);
                    this.filters.get('segmentoSku').setValue(null);
                }
            });

        }
        this.filtrosService.getSegmentoPorAgrupamento(subCategoriaFormatada, this.agrupamentoDetailId).subscribe((response) => {
            this.segmentos = response.data;
            this.filters.get('segmentoSku').enable();
        });
    }

    habilitarSubSegmento() {
        const segmentos = this.filters.get('segmentoSku').value;
        let segmentoFormatado: any = [];

        if (segmentos !== undefined) {
            segmentos.forEach(element => {
                if (segmentoFormatado.indexOf(element.codigo) === -1) {
                    segmentoFormatado.push(element.codigo.replace(/\./g, ""));
                } else {
                    segmentoFormatado.splice(segmentoFormatado.indexOf(element.codigo), 1);
                    this.filters.get('segmentoSku').setValue(null);
                }
            });

        }
        this.filtrosService.getSubSegmentoPorAgrupamento(segmentoFormatado, this.agrupamentoDetailId).subscribe((response) => {
            this.subSegmentos = response.data;
            this.filters.get('subSegmentoSku').enable();
        });
    }

    searchSkus(event?) {
        if (event) {
            this.selectedPage = 1;
            this.selectedPageSearchSku = 1;
            this.skusBuscados = [];
            this.noPaginationSearched = false;
            this.checked = false;
        }

        if (this.noPaginationSearched)
            return;


        const form = this.filters;
        const nome = form.get('nomeSku').value;
        const letra = form.get('letraSku').value;

        const departamento = form.get('departamentoSku').value
        let departamentosSelecionados: any = [];
        if (departamento !== undefined && departamento !== null) {
            departamento.forEach(element => {
                departamentosSelecionados.push(element.descricao);
            });
        }

        const categoria = form.get('categoriaSku').value
        let categoriasSelecionadas: any = [];
        if (categoria !== undefined && categoria !== null) {
            categoria.forEach(element => {
                categoriasSelecionadas.push(element.descricao);
            });
        }

        const subCategoria = form.get('subCategoriaSku').value
        let subCategoriasSelecionadas: any = [];
        if (subCategoria !== undefined && subCategoria !== null) {
            subCategoria.forEach(element => {
                subCategoriasSelecionadas.push(element.descricao);
            });
        }

        const segmento = form.get('segmentoSku').value
        let segmentosSelecionados: any = [];
        if (segmento !== undefined && segmento !== null) {
            segmento.forEach(element => {
                segmentosSelecionados.push(element.descricao);
            });
        }

        const subSegmento = form.get('subSegmentoSku').value
        let subSegmentosSelecionados: any = [];
        if (subSegmento !== undefined && subSegmento !== null) {
            subSegmento.forEach(element => {
                subSegmentosSelecionados.push(element.descricao);
            });
        }

        const body = {
            codigoAgrupamento: this.agrupamentoDetailId,
            nome: nome ? nome : null,
            letra: letra ? letra : null,
            departamentos: departamento ? departamentosSelecionados : null,
            categorias: categoria ? categoriasSelecionadas : null,
            subCategorias: subCategoria ? subCategoriasSelecionadas : null,
            segmentos: segmento ? segmentosSelecionados : null,
            subSegmentos: subSegmento ? subSegmentosSelecionados : null
        }

        if (body.nome !== null || body.letra !== null || body.departamentos !== null) {
            this.agrupamentoService.getSkusPorAgrupamento(body, this.selectedPageSearchSku).subscribe((response) => {
                this.skusBuscados = this.skusBuscados ? [...this.skusBuscados, ...response.data] : response.data;
                if (response.data.length <= 0) {
                    this.searched = true;
                    this.noPaginationSearched = true;
                }
                if (this.skusBuscados.length <= 0) {
                    this.hasSkus = false;
                    this.emptySearch = true;
                    this.filters.get('nomeSku').setValue(null);
                    this.filters.get('letraSku').setValue(null);
                    this.filters.get('departamentoSku').setValue(null);
                    this.filters.get('categoriaSku').setValue(null);
                    this.filters.get('subCategoriaSku').setValue(null);
                    this.filters.get('segmentoSku').setValue(null);
                    this.filters.get('subSegmentoSku').setValue(null);
                    return;
                }
                this.hasSkus = true;
                this.totalFitrados = this.skusBuscados[0].totalProdutos;
                this.dataSourceSKU = new MatTableDataSource(this.skusBuscados);
            });
        } else {
            this.enableMessage = true;
            this._snackBar.open('Preecha o Nome ou a Letra ou o Departamento para efetuar a busca', '', { duration: 3000 });
        }

    }

    nextPageSearch() {
        this.selectedPageSearchSku = this.selectedPageSearchSku + 1;
        this.searchSkus();
    }

    addRespostaAtributo(resposta: any): void {
        const respostaIdx = this.codigosAtributosRespostasSelecionadas.findIndex(resp => resp.codigoAtributo === resposta.codigoAtributo)
        if (respostaIdx !== -1) {
            this.codigosAtributosRespostasSelecionadas[respostaIdx] = { codigoAtributo: resposta.codigoAtributo, codigoResposta: resposta.codigo }
            return;
        }
        this.codigosAtributosRespostasSelecionadas.push({ codigoAtributo: resposta.codigoAtributo, codigoResposta: resposta.codigo });
    }


    addCheckedSku(sku: any, event: MatCheckboxChange): void {
        this.showExcluirSKU = true;
        if (this.checkedSkuCodigo.indexOf(sku.codigo) === -1) {
            this.checkedSkuCodigo.push(sku.codigo);
        } else {
            this.checkedSkuCodigo.splice(this.checkedSkuCodigo.indexOf(sku.codigo), 1);
        }
        if (!!event.checked) {
            sku.historicoRespostas = {};
        }

        const departamento = this.filters.get('departamentoSku').value;
        let departamentosSelecionados: any = [];
        if (departamento !== undefined && departamento !== null) {
            departamento.forEach(element => {
                departamentosSelecionados.push(element.descricao);
            });
        }

        const categoria = this.filters.get('categoriaSku').value;
        let categoriasSelecionadas: any = [];
        if (categoria !== undefined && categoria !== null) {
            categoria.forEach(element => {
                categoriasSelecionadas.push(element.descricao);
            });
        }

        const subCategoria = this.filters.get('subCategoriaSku').value;
        let subCategoriasSelecionadas: any = [];
        if (subCategoria !== undefined && subCategoria !== null) {
            subCategoria.forEach(element => {
                subCategoriasSelecionadas.push(element.descricao);
            });
        }

        const segmento = this.filters.get('segmentoSku').value;
        let segmentosSelecionados: any = [];
        if (segmento !== undefined && segmento !== null) {
            segmento.forEach(element => {
                segmentosSelecionados.push(element.descricao);
            });
        }

        const subSegmento = this.filters.get('subSegmentoSku').value
        let subSegmentosSelecionados: any = [];
        if (subSegmento !== undefined && subSegmento !== null) {
            subSegmento.forEach(element => {
                subSegmentosSelecionados.push(element.descricao);
            });
        }


        const body: any = {
            codigoAgrupamento: +this.agrupamentoDetailId,
            nome: this.filters.get('nomeSku').value,
            letra: this.filters.get('letraSku').value,
            departamentos: departamento && departamento.length ? departamentosSelecionados : null,
            categorias: categoria && categoria.length ? categoriasSelecionadas : null,
            subCategorias: subCategoria && subCategoria.length ? subCategoriasSelecionadas : null,
            segmentos: segmento && segmento.length ? segmentosSelecionados : null,
            subSegmentos: subSegmento && subSegmento.length ? subSegmentosSelecionados : null,
            associacaoNaBusca: false,
            filtroAtributoCadastrado: this.codigosAtributosRespostasSelecionadas
        }
        if (body.filtroAtributoCadastrado.length && event.checked) {
            this.agrupamentoService.skuCheckUnico(body, this.agrupamentoDetailId, sku.codigo).subscribe((response) => {
                if (response.code === 200) {
                    this.skus = [];
                    setTimeout(() => {
                        this.getSkus();
                    }, 200);
                }
            })
        }
    }

    checkAllSku(skus: any[], event: MatCheckboxChange): void {
        this.showExcluirSKU = true;
        const departamento = this.filters.get('departamentoSku').value;
        let departamentosSelecionados: any = [];
        if (departamento !== undefined && departamento !== null) {
            departamento.forEach(element => {
                departamentosSelecionados.push(element.descricao);
            });
        }

        const categoria = this.filters.get('categoriaSku').value;
        let categoriasSelecionadas: any = [];
        if (categoria !== undefined && categoria !== null) {
            categoria.forEach(element => {
                categoriasSelecionadas.push(element.descricao);
            });
        }

        const subCategoria = this.filters.get('subCategoriaSku').value;
        let subCategoriasSelecionadas: any = [];
        if (subCategoria !== undefined && subCategoria !== null) {
            subCategoria.forEach(element => {
                subCategoriasSelecionadas.push(element.descricao);
            });
        }

        const segmento = this.filters.get('segmentoSku').value;
        let segmentosSelecionados: any = [];
        if (segmento !== undefined && segmento !== null) {
            segmento.forEach(element => {
                segmentosSelecionados.push(element.descricao);
            });
        }

        const subSegmento = this.filters.get('subSegmentoSku').value
        let subSegmentosSelecionados: any = [];
        if (subSegmento !== undefined && subSegmento !== null) {
            subSegmento.forEach(element => {
                subSegmentosSelecionados.push(element.descricao);
            });
        }


        const body: any = {
            codigoAgrupamento: +this.agrupamentoDetailId,
            nome: this.filters.get('nomeSku').value,
            letra: this.filters.get('letraSku').value,
            departamentos: departamento && departamento.length ? departamentosSelecionados : null,
            categorias: categoria && categoria.length ? categoriasSelecionadas : null,
            subCategorias: subCategoria && subCategoria.length ? subCategoriasSelecionadas : null,
            segmentos: segmento && segmento.length ? segmentosSelecionados : null,
            subSegmentos: subSegmento && subSegmento.length ? subSegmentosSelecionados : null,
            associacaoNaBusca: false,
            filtroAtributoCadastrado: this.codigosAtributosRespostasSelecionadas
        }
        if (event.checked === true) {
            this.agrupamentoService.skuCheckAll(body, this.agrupamentoDetailId).subscribe((response) => {
                if (response.code === 200) {
                    this.skus = [];
                    this.checked = false;
                    this.getSkus();
                }
            })
        }


    }

    selecionarTodos(event: MatCheckboxChange): void {
        this.checked = !!event.checked;

        if (this.checkedSkus.length === 0) {
            this.checkedSkus = this.skus

            this.checkAllSku(this.checkedSkus, event);

        } else {
            this.showExcluirSKU = false;
            this.checkedSkus = [];
            this.skus = [];
            this.getSkus();
        }
    }

    atribuiNovoSku() {
        this.dialogRef = this._matDialog.open(SkuDialogComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                codigo: this.agrupamentoDetailId ? this.agrupamentoDetailId : 0,
                nome: this.form.get('nome').value ? this.form.get('nome').value : '',
                ativo: this.form.get('ativo').value ? this.form.get('ativo').value : true,
                sugerido: this.form.get('podeSugerir').value ? this.form.get('podeSugerir').value : true,
                atributos: this.atributos ? this.atributos : [],
                agrupamentosCorrelatos: this.agrupamentosCorrelatos ? this.agrupamentosCorrelatos : [],
                produtos: this.skus ? this.skus : []
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response) => {
                this.selectedPage = 1;
                this.noPagination = false;
                this.skus = [];
                this.getAtributos();
                this.getAtributosRespostas();
                this.getAgrupamentoCabecalho();
                if (!response) {
                    return;
                }
            });
    }

    removeSku() {
        this.dialogRef = this._matDialog.open(DeleteSkuDialogComponent, {
            panelClass: 'remove-sku-contact-form-dialog',
            data: { codigoAgrupamento: this.agrupamentoDetailId, skus: this.checkedSkuCodigo }
        });

        this.dialogRef.afterClosed()
            .subscribe((response) => {
                this.displayedSKUColumns = [];
                this.checkedSkuCodigo = [];
                this.checked = false;
                this.skus = [];
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
                this.getAtributos();
                this.getAgrupamentoCabecalho();
                if (!response) {
                    return;
                }
            });
    }

    editRespostaSku(sku) {
        const departamento = this.filters.get('departamentoSku').value;
        let departamentosSelecionados: any = [];
        if (departamento !== undefined && departamento !== null) {
            departamento.forEach(element => {
                departamentosSelecionados.push(element.descricao);
            });
        }

        const categoria = this.filters.get('categoriaSku').value;
        let categoriasSelecionadas: any = [];
        if (categoria !== undefined && categoria !== null) {
            categoria.forEach(element => {
                categoriasSelecionadas.push(element.descricao);
            });
        }

        const subCategoria = this.filters.get('subCategoriaSku').value;
        let subCategoriasSelecionadas: any = [];
        if (subCategoria !== undefined && subCategoria !== null) {
            subCategoria.forEach(element => {
                subCategoriasSelecionadas.push(element.descricao);
            });
        }

        const segmento = this.filters.get('segmentoSku').value;
        let segmentosSelecionados: any = [];
        if (segmento !== undefined && segmento !== null) {
            segmento.forEach(element => {
                segmentosSelecionados.push(element.descricao);
            });
        }


        const body: any = {
            nome: this.filters.get('nomeSku').value,
            letra: this.filters.get('letraSku').value,
            departamentos: departamento && departamento.length ? departamentosSelecionados : null,
            categorias: categoria && categoria.length ? categoriasSelecionadas : null,
            subCategorias: subCategoria && subCategoria.length ? subCategoriasSelecionadas : null,
            segmentos: segmento && segmento.length ? segmentosSelecionados : null,
            associacaoNaBusca: false,
            filtroAtributoCadastrado: null
        }
        this.dialogRef = this._matDialog.open(EditRespostasSkuDialogComponent, {
            panelClass: 'contact-form-dialog-edit-respostas',
            data: {
                codigoAgrupamento: this.agrupamentoDetailId,
                produto: sku,
                body: body
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response) => {
                this.displayedSKUColumns = [];
                this.checkedSkuCodigo = [];
                this.checked = false;
                this.skus = [];
                this.getAgrupamentoCabecalho();
                setTimeout(() => {
                    this.getAtributos();
                }, 200);
                if (!response) {
                    return;
                }
            });
    }


    saveAgrupamento() {
        const ativo = this.form.get('ativo').value;
        const podeSugerir = this.form.get('podeSugerir').value;
        const body = {
            codigo: this.agrupamentoDetailId ? this.agrupamentoDetailId : 0,
            nome: this.form.get('nome').value ? this.form.get('nome').value : '',
            ativo: ativo,
            sugerido: podeSugerir,
            atributos: this.atributos ? this.atributos : []
        }
        if (body.codigo === 0) {
            this.agrupamentoService.cadastrarAgrupamento(body).subscribe((response) => {
                this.router.navigate(["/agrupamento/editar/" + response.data.codigo]);
                if (response.code !== 200) {
                    this._snackBar.open('Ocorreu um erro, contate o administrador do sistema', '', { duration: 3000 });
                }
            });
        }
        else {
            this.agrupamentoService.editarAgrupamento(body).subscribe((response) => {
                if (response.code === 200) {
                    this.getAgrupamentoCabecalho();
                    this.getAtributos();
                    this.getAgrupamentosCorrelatos();
                    this.getAtributosRespostas();
                    this.getDepartamentos();
                    this._snackBar.open('Agrupamento editado com sucesso!', '', { duration: 3000 });
                } else {
                    this._snackBar.open('Ocorreu um erro, contate o administrador do sistema', '', { duration: 3000 });
                }
            });
        }
    }
}