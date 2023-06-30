class Calculator{

    constructor(previousoperandtextelement,currentoperandtextelement){
        this.previousoperandtextelement=previousoperandtextelement;
        this.currentoperandtextelement=currentoperandtextelement;
        this.clear();
    }
    clear(){
        this.currentOperand="";
        this.previousOperand="";
        this.operation=undefined;
      }
      deletelast(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1);
      }
      chooseOperation(operation){
        if(this.currentOperand==="") return;
        if(this.previousOperand!=null) this.compute();
        
        this.operation=operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand="";
      }
      compute(){
        let computation;
        const prev=parseFloat(this.previousOperand);
        const curr=parseFloat(this.currentOperand);
        
        switch(this.operation){
            case "+":
                computation=prev+curr;
                break;
            case "-":
                computation=prev-curr;
                break;
            case "*":
                computation=prev*curr;
                break;
            case "/":
                computation=prev/curr;
                break;
            default:
            return;
        }
        this.currentOperand=computation;
        this.operation=undefined;
        this.previousOperand="";
      }
      getDisplay(number){
        const digit=number.toString();
        const integerDigit=parseFloat(digit.split(".")[0]);
        const decimalDigit=digit.split(".")[1];
        
        let integerDisplay;
        if(isNaN(integerDigit)) integerDisplay="";
        else integerDisplay=integerDigit.toLocaleString("en",{maximumFractionDigits:0});

        if(decimalDigit!=null){
            return`${integerDisplay}.${decimalDigit}`;
        }
        else return integerDisplay;
      }
    appendNumber(number){
        if(number=="." && this.currentOperand.includes(".")) return;
        this.currentOperand=this.currentOperand.toString()+number.toString();
    }
    upadateDisplay(){
        this.currentoperandtextelement.innerText=this.getDisplay(this.currentOperand);
        if(this.operation!=null){
            this.previousoperandtextelement.innerText=this.getDisplay(this.previousOperand)+" "+ this.operation;
        }
        else this.previousoperandtextelement.innerText="";
    }
}


const NumberButtons=document.querySelectorAll("[data-number]");

const OperaionButtons=document.querySelectorAll("[data-operation]");

const AllClear=document.querySelector("[data-all-clear]");

const deleteButton=document.querySelector("[data-delete]");

const Equals=document.querySelector("[data-equals]");

const previousoperandtextelement=document.querySelector("[data-previous-operand]");

const currentoperandtextelement=document.querySelector("[data-current-operand]");

const calculator = new Calculator(
    previousoperandtextelement,
    currentoperandtextelement
  );
  
  NumberButtons.forEach((button)=>{
      button.addEventListener("click",()=>{
          calculator.appendNumber(button.innerText);
          calculator.upadateDisplay();
      })
  })

  OperaionButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        calculator.chooseOperation(button.innerText);
        calculator.upadateDisplay();
    })
  })

  AllClear.addEventListener("click",()=>{
    calculator.clear();
    calculator.upadateDisplay();
  })

  deleteButton.addEventListener("click",()=>{
    calculator.deletelast();
    calculator.upadateDisplay();
  })

  Equals.addEventListener("click",()=>{
    calculator.compute();
    calculator.upadateDisplay();
  })