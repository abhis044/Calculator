class Calculator{
    constructor(CurrentNumbers,Result){
        this.CurrentNumbers=CurrentNumbers;
        this.Result=Result;
        this.clear();
    }
    clear(){
        this.currentnumber="";
        this.result="";
        this.operatorsindex=[];
    }
    appendNumber(number){
        let size=this.currentnumber.length;
        let n=this.operatorsindex.length;
        if(size==1 && this.currentnumber=="0") this.currentnumber="";
        if(n==0 && number=="." && this.currentnumber.includes(".")) return;
        if(n!=0 && number=="."){
            let idx=this.operatorsindex[n-1];
            if(this.currentnumber.substring(idx,size).includes(".")) return;
        }
        this.currentnumber=this.currentnumber.toString()+number.toString();   
    }
    appendoperation(number){
        if(this.currentnumber=="" && this.result!="") {
            this.currentnumber=this.result;
        }
        let size=this.currentnumber.length;

        if(size==0) return;
        const st="+-*/";
        if(st.includes(this.currentnumber[size-1])) {
           this.currentnumber=this.currentnumber.toString().slice(0,-1);
        }
        this.currentnumber=this.currentnumber.toString()+number.toString();
        this.operatorsindex.push(size);
    }
    compute(){
        let size=this.currentnumber.length;
        const st="+-*/";
        if(size==0) return;
        if(size==1 && this.currentnumber==".") return eval("0.");
        if(this.currentnumber[size-1]=='.' && st.includes(this.currentnumber[size-2])){
            this.currentnumber=this.currentnumber.substring(0,size-1)+"0."
        }
        if(st.includes(this.currentnumber[size-1])) {
          this.result=eval(this.currentnumber.substring(0,size-1));
         }
         else this.result=eval(this.currentnumber);
     }
    updateDisplay(){
        this.CurrentNumbers.innerText=this.currentnumber.toString();
        this.Result.innerText=this.result.toString();
    }
    equalsfn(){
        this.currentnumber="";
        this.operatorsindex=[];
    }
  deletelast(){
    const st="+-*/";
    let size=this.currentnumber.length;
    if(size==1){
        this.currentnumber="";
        this.result="";
        return;
    }
    if(this.currentnumber=="" && this.result!=""){
        this.result=this.result.toString().slice(0,-1);
    }
    if(st.includes(this.currentnumber[size-1])) {
        this.operatorsindex.pop();
    }
    this.currentnumber=this.currentnumber.toString().slice(0,-1);
  }
}
const NumberButtons=document.querySelectorAll("[data-number]");

const OperationButtons=document.querySelectorAll("[data-operation]")

const AllClear=document.querySelector("[data-all-clear]");

const deleteButton=document.querySelector("[data-delete]");

const Equals=document.querySelector("[data-equals]");

const CurrentNumbers=document.querySelector("[data-currentnumbers]");

const Result =document.querySelector("[data-result]");

const calculator=new Calculator( 
    CurrentNumbers,
    Result
)
NumberButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        calculator.appendNumber(button.innerText);
        calculator.compute();
        calculator.updateDisplay();
    })
})

OperationButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        calculator.appendoperation(button.innerText);
        calculator.compute();
        calculator.updateDisplay();
    })
})
AllClear.addEventListener("click",()=>{
    calculator.clear();
    calculator.updateDisplay();
})

Equals.addEventListener("click",()=>{
    calculator.equalsfn();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click",()=>{
    calculator.deletelast();
    calculator.compute();
    calculator.updateDisplay();
})