/**
 * Created by Lucas on 14/02/2017.
 */
    Vue.filter('doneLabel', function (value) {
        if(value == 0){
            return "Não paga";
        }else{
            return "Paga";
        }
    });

    Vue.filter('generalStatus', function (value) {

        if(value === false){
            return 'Nenhuma conta cadastrada.';
        }

        if(!value){
            return 'Nenhuma conta a pagar.';
        }else{
            return 'Existe(m) '+ value + 'conta(s) a ser(em) paga(s).';
        }
    });

    var app = new Vue ({
    el: "#app",
    data: {
        teste: "",

        title: "Contas a pagar",

        menu: [
            {id: 0, name: "Listar contas"},
            {id: 1, name: "Criar conta"}
        ],

        activedView: 0,

        formType: "insert",

        bill:{
           date_due:"",
            name:"",
            value: 0,
            done: false
        },

        names:
         [
            'Conta de luz',
            'Conta de água',
             'Gasolina',
             'Telefone',
             'Empréstimo',
             'Parcela carro',
             'Mercado',
             'Cartão'
         ],
        bills:[
                {date_due: '20/08/2016', name:'Conta de luz', value: 25.99,done:true},
                {date_due: '21/08/2016', name:'Conta de água', value: 25.99,done:true},
                {date_due: '22/08/2016', name:'Conta de telefone', value: 25.99,done:false},
                {date_due: '23/08/2016', name:'Cartão', value: 25.99,done:false},
                {date_due: '24/08/2016', name:'Gasolina', value: 25.99,done:false}
            ],
        },
        computed: {
            /*status: function () {

                if(!this.bills.length){
                    return false;
                }
                var nCount = 0;

                for (var i in this.bills) {

                    if(!this.bills[i].done){
                        nCount ++;
                    }
                }
                return !nCount?"Nenhuma conta a pagar":"Existem " + nCount + " contas a serem pagas";
            },*/

            Total: function(){
                var nVlrTot  = 0;
                var nVlrPago = 0;
                var nVlrRest = 0;

                for (var i in this.bills) {

                    if(!this.bills[i].done){
                        nVlrRest = nVlrRest + this.bills[i].value;
                    }
                    else{
                        nVlrPago = nVlrPago + this.bills[i].value;
                    }

                    nVlrTot = nVlrTot + this.bills[i].value;
                }
                return "Valor pago: R$ " + nVlrPago + " Valor a pagar: R$ " + nVlrRest + " Total: R$ " + nVlrTot;
            }
        },
        methods:{
            showView: function (id) {

                this.activedView = id;

                if(id == 1){
                    this.formType = 'insert';
                }

            },

            submit: function () {

                if(this.formType == 'insert'){
                    this.bills.push(this.bill);
                };

                this.bill = {
                    date_due:"",
                    name:"",
                    value: 0,
                    done: false
                };
                this.activedView = 0;
            },
            loadBill: function (bill) {
                this.bill = bill;
                this.activedView = 1;
                this.formType = "update";
            },
            deleteBill: function (bill) {
                if(confirm('Este registro será apagado permanentemente. Continuar?')){
                    this.bills.$remove(bill);
                }
            }
        }
    });

    app.$watch('test', function (novoValor, velhoValor) {
        console.log('velhoValor: ' + velhoValor);
        console.log('novoValor: ' + novoValor);
    });

    $(document).ready(function () {
        $('.button-collapse').sideNav();
        $('#interminate').material_select();
        $('#btnModal').modal();
        //$('#btnModal').modal('open');
    });