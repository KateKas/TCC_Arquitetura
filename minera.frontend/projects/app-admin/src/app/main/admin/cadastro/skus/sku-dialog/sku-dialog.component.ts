import { Component, OnInit, Inject, ViewChild, HostListener } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, PageEvent, MatSnackBar, MatDialog, MatCheckboxChange } from '@angular/material';
import { SkusModel } from '../../../../models/sku-model';
import { FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgrupamentoService } from '../../../../services/agrupamento.service';
import { FiltrosService } from '../../../../services/filtros.service';
import { Router } from '@angular/router';
import { ConfirmInsercaoSkuDialogComponent } from '../confirm-insercao-sku-dialog/confirm-insercao-sku-dialog.component';

@Component({
  selector: 'app-sku-dialog',
  templateUrl: './sku-dialog.component.html',
  styleUrls: ['./sku-dialog.component.scss']
})
export class SkuDialogComponent implements OnInit {
  displayedSKUColumns: string[] = ['checkbox', 'id', 'name'];
  dataSourceSKU: MatTableDataSource<SkusModel>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  dialogTitle: string;
  alphabet: any;
  departamentos: any[];
  categorias: any[];
  subCategorias: any[];
  segmentos: any[];
  subSegmentos: any[];
  activesSku: number[] = [];
  dialogRef: any;
  atributosRespostas: any;
  filters = new FormGroup({
    nomeSku: new FormControl(),
    letraSku: new FormControl(),
    departamentoSku: new FormControl(null),
    categoriaSku: new FormControl(null),
    subCategoriaSku: new FormControl(null),
    segmentoSku: new FormControl(null),
    subSegmentoSku: new FormControl(null),
  });
  hasSkus = false;
  searched = false;
  length: number;
  pageSize = 50;
  pageSizeOptions = [5, 10, 20];
  pageIndex = 1;
  pageEvent: PageEvent;
  produtosBuscados: any[];
  checked;
  mostrarSelecionarTudoECombos: boolean = false;
  selectedPage: number = 1;
  noPagination = false;
  loading = false;
  codigosAtributosRespostasSelecionadas: any[] = [];
  enableMessage = false;
  totalProdutos: number = 0;
  selectAllChecked = true;
  constructor(
    public matDialogRef: MatDialogRef<SkusModel>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private agrupamentoService: AgrupamentoService,
    private filtrosService: FiltrosService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.dialogTitle = "Atribuir novo produto para o agrupamento";
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    this.filters.get('categoriaSku').disable();
    this.filters.get('subCategoriaSku').disable();
    this.filters.get('segmentoSku').disable();
    this.filters.get('subSegmentoSku').disable();
    this.getDepartamentos();
    this.getAtributosRespostas();
    window.addEventListener('scroll', this.onScrollPagination.bind(this), true);
  }

  onScrollPagination(event) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight && this.enableMessage) {
      if (this.searched && event.target.scrollTop > 2000) {
        this.selectedPage = this.selectedPage + 1;
        this.searchSkus();
      }
    }
  }


  getDepartamentos() {
    this.filtrosService.getDepartamentos().subscribe((response) => {
      this.departamentos = response.data;
    });
  }

  getAtributosRespostas() {
    this.agrupamentoService.getAtributosRespostas(this._data.codigo).subscribe((response) => {
      this.atributosRespostas = response.data;
    });
  }


  limparFiltros() {
    this.filters.get('nomeSku').setValue(null);
    this.filters.get('letraSku').setValue(null);
    this.filters.get('departamentoSku').setValue(null);
    this.filters.get('categoriaSku').setValue(null);
    this.filters.get('subCategoriaSku').setValue(null);
    this.filters.get('segmentoSku').setValue(null);
    this.filters.get('subSegmentoSku').setValue(null);
    this.produtosBuscados = [];
    this.hasSkus = false;
  }

  habilitarCategorias() {
    this.loading = true;
    this.noPagination = false;
    this.hasSkus = false;
    this.produtosBuscados = [];
    this.selectedPage = 1;
    const departamento = this.filters.get('departamentoSku').value;
    const departamentosSelecionados = [];
    this.filters.get('categoriaSku').setValue(null);
    this.filters.get('subCategoriaSku').setValue(null);
    this.filters.get('segmentoSku').setValue(null);
    this.filters.get('subSegmentoSku').setValue(null);
    departamento.forEach(element => {
      if (departamentosSelecionados.indexOf(element.codigo) === -1) {
        departamentosSelecionados.push(element.codigo);
      } else {
        departamentosSelecionados.splice(departamentosSelecionados.indexOf(element.codigo), 1);
      }
    });
    this.filtrosService.getCategorias(departamentosSelecionados).subscribe((response) => {
      this.categorias = response.data;
      this.loading = false;
      this.mostrarSelecionarTudoECombos = false;
      this.filters.get('categoriaSku').enable();
    });
  }

  habilitarSubCategoria() {
    this.loading = true;
    this.noPagination = false;
    this.produtosBuscados = [];
    this.hasSkus = false;
    this.selectedPage = 1;
    const categorias = this.filters.get('categoriaSku').value;
    let categoriaFormatada: any = [];
    this.filters.get('segmentoSku').setValue(null);
    this.filters.get('subCategoriaSku').setValue(null);
    this.filters.get('subSegmentoSku').setValue(null);


    if (categorias !== undefined) {
      categorias.forEach(element => {
        if (categoriaFormatada.indexOf(element.codigo) === -1) {
          categoriaFormatada.push(element.codigo.replace(/\./g, ""));
        } else {
          categoriaFormatada.splice(categoriaFormatada.indexOf(element.codigo), 1);
        }
      });
    }

    this.filtrosService.getSubCategorias(categoriaFormatada).subscribe((response) => {
      this.subCategorias = response.data;
      this.loading = false;
      this.mostrarSelecionarTudoECombos = true;
      this.filters.get('subCategoriaSku').enable();
    });
  }

  habilitarSegmento() {
    this.loading = true;
    this.noPagination = false;
    this.hasSkus = false;
    this.produtosBuscados = [];
    this.selectedPage = 1;
    const subCategorias = this.filters.get('subCategoriaSku').value;
    let subCategoriaFormatada: any = [];
    this.filters.get('segmentoSku').setValue(null);
    this.filters.get('subSegmentoSku').setValue(null);

    if (subCategorias !== undefined) {
      subCategorias.forEach(element => {
        if (subCategoriaFormatada.indexOf(element.codigo) === -1) {
          subCategoriaFormatada.push(element.codigo.replace(/\./g, ""));
        } else {
          subCategoriaFormatada.splice(subCategoriaFormatada.indexOf(element.codigo), 1);
        }
      });
    }
    this.filtrosService.getSegmento(subCategoriaFormatada).subscribe((response) => {
      this.loading = false;
      this.mostrarSelecionarTudoECombos = true;
      this.segmentos = response.data;
      this.filters.get('segmentoSku').enable();
    });
  }

  habilitarSubSegmento() {
    this.loading = true;
    this.noPagination = false;
    this.hasSkus = false;
    this.produtosBuscados = [];
    this.selectedPage = 1;
    const segmentos = this.filters.get('segmentoSku').value;
    let segmentoFormatado: any = [];
    this.filters.get('subSegmentoSku').setValue(null);

    if (segmentos !== undefined) {
      segmentos.forEach(element => {
        if (segmentoFormatado.indexOf(element.codigo) === -1) {
          segmentoFormatado.push(element.codigo.replace(/\./g, ""));
        } else {
          segmentoFormatado.splice(segmentoFormatado.indexOf(element.codigo), 1);
        }
      });
    }
    this.filtrosService.getSubSegmento(segmentoFormatado).subscribe((response) => {
      this.loading = false;
      this.mostrarSelecionarTudoECombos = true;
      this.subSegmentos = response.data;
      this.filters.get('subSegmentoSku').enable();
    });
  }

  addRespostaAtributo(resposta) {
    const respostaIdx = this.codigosAtributosRespostasSelecionadas.findIndex(resp => resp.codigoAtributo === resposta.codigoAtributo);
    if (respostaIdx !== -1) {
      this.codigosAtributosRespostasSelecionadas[respostaIdx] = { codigoAtributo: resposta.codigoAtributo, codigoResposta: resposta.codigo };
      return;
    }
    this.codigosAtributosRespostasSelecionadas.push({ codigoAtributo: resposta.codigoAtributo, codigoResposta: resposta.codigo })
  }

  selecionarTodos() {
    this.hasSkus = false;
    this.loading = true;
    this.selectAllChecked = false
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


    const subSegmento = this.filters.get('subSegmentoSku').value;
    let subSegmentosSelecionados: any = [];
    if (subSegmento !== undefined && subSegmento !== null) {
      subSegmento.forEach(element => {
        subSegmentosSelecionados.push(element.descricao);
      });
    }


    const body: any = {
      codigoAgrupamento: +this._data.codigo,
      nome: this.filters.get('nomeSku').value,
      letra: this.filters.get('letraSku').value,
      departamentos: departamento && departamento.length ? departamentosSelecionados : null,
      categorias: categoria && categoria.length ? categoriasSelecionadas : null,
      subCategorias: subCategoria && subCategoria.length ? subCategoriasSelecionadas : null,
      segmentos: segmento && segmento.length ? segmentosSelecionados : null,
      subSegmentos: subSegmento && subSegmento.length ? segmentosSelecionados : null,
      associacaoNaBusca: true,
      filtroAtributoCadastrado: this.codigosAtributosRespostasSelecionadas
    }
    this.dialogRef = this._matDialog.open(ConfirmInsercaoSkuDialogComponent, {
      panelClass: 'confirm-insert-sku-contact-form-dialog',
      data: { body }
    });

    this.dialogRef.afterClosed()
      .subscribe((response) => {
        this.searchSkus();
        if (this.dialogRef.componentInstance.isSave) {
          this.limparFiltros();
          this.hasSkus = false;
          this.loading = true;
          this._snackBar.open('Produto vinculados com sucesso', '', { duration: 3000 });
          return;
        }
        this.checked = false;
      });
  }

  addSku(sku, event) {
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

    const subSegmento = this.filters.get('subSegmentoSku').value;
    let subSegmentosSelecionados: any = [];
    if (subSegmento !== undefined && subSegmento !== null) {
      subSegmento.forEach(element => {
        subSegmentosSelecionados.push(element.descricao);
      });
    }


    const body: any = {
      codigoAgrupamento: +this._data.codigo,
      nome: this.filters.get('nomeSku').value,
      letra: this.filters.get('letraSku').value,
      departamentos: departamento && departamento.length ? departamentosSelecionados : null,
      categorias: categoria && categoria.length ? categoriasSelecionadas : null,
      subCategorias: subCategoria && subCategoria.length ? subCategoriasSelecionadas : null,
      segmentos: segmento && segmento.length ? segmentosSelecionados : null,
      subSegmentos: subSegmento && subSegmento.length ? segmentosSelecionados : null,
      associacaoNaBusca: true,
      filtroAtributoCadastrado: this.codigosAtributosRespostasSelecionadas
    }
    if (event.checked) {
      this.agrupamentoService.skuCheckUnico(body, body.codigoAgrupamento, sku.codigo).subscribe((response) => {
        if (response.code === 200) {
          this._snackBar.open('Produto associado com sucesso', '', { duration: 1000 });
          this.produtosBuscados = [];
          this.searchSkus();
          return;
        }
      })
    }

    this.agrupamentoService.removeSkusVinculados([sku.codigo], +this._data.codigo).subscribe((response) => {
      if (response.code === 200) {
        this._snackBar.open('Produto desassociado com sucesso!', '', { duration: 3000 });
      }
    });
  }


  searchSkus(event?) {
    if (event) {
      this.selectedPage = 1;
      this.produtosBuscados = [];
      this.hasSkus = false;
      this.noPagination = false;
    }
    if (this.noPagination && !event)
      return
    const form = this.filters;
    const nome = form.get('nomeSku').value;
    const nomeSemEspaco = nome !== null ? nome.trim() : null;
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

    const subSegmento = this.filters.get('subSegmentoSku').value;
    let subSegmentosSelecionados: any = [];
    if (subSegmento !== undefined && subSegmento !== null) {
      subSegmento.forEach(element => {
        subSegmentosSelecionados.push(element.descricao);
      });
    }


    const body = {
      codigoAgrupamento: this._data.codigo,
      nome: nome && nomeSemEspaco.length > 0 ? nome : null,
      letra: letra ? letra : null,
      departamentos: departamento && departamento.length > 0 ? departamentosSelecionados : null,
      categorias: categoria && categoria.length > 0 ? categoriasSelecionadas : null,
      subCategorias: subCategoria && subCategoria.length > 0 ? subCategoriasSelecionadas : null,
      segmentos: segmento ? segmentosSelecionados : null,
      subSegmentos: subSegmento ? subSegmentosSelecionados : null
    }
    this.enableMessage = true;

    if (body.nome !== null || body.letra !== null || body.departamentos !== null) {
      this.loading = true;
      this.agrupamentoService.getSkusFiltrados(body, this.selectedPage).subscribe((response) => {
        this.loading = false;
        this.searched = true;

        if (response.data.length <= 0) {
          this.noPagination = true;
          return;
        }

        this.produtosBuscados = this.produtosBuscados ? [...this.produtosBuscados, ...response.data] : response.data;
        if (this.produtosBuscados.length <= 0 && this.selectedPage === 1) {
          this.hasSkus = false;
        } else {
          this.hasSkus = true;
          this.totalProdutos = this.produtosBuscados[0].totalProdutos;
        }
        this.dataSourceSKU = new MatTableDataSource(this.produtosBuscados);
      });
    }
    else if (event && body.nome === null || body.letra === null || body.departamentos === null) {
      this._snackBar.open('Preecha o Nome ou a Letra ou o Departamento para efetuar a busca', '', { duration: 3000 });
    }
  }


  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScrollPagination, true);
  }

}