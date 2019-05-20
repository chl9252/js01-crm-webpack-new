import dbRequest from './request.js'
 
main()

function main () {
//	const url = 'http://89.108.64.67:3000'
//	const key = '?key=adjf989f89981045789sdf'

	document.querySelector('button').addEventListener('click', function(event) {
		event.stopPropagation()
		const input = document.forms.firstForm.elements
 //console.log(input)

  		let priceCop = input[2].value.replace('.', '')	
  		if(priceCop === input[2].value) {
	    	priceCop +='00'
    	}
	//const newOrder = JSON.stringify({
		const newOrder = {
			good: input[1].value,
			price: priceCop,
			clientName: input[0].value,
			requestStatus: input[3].value,
			paymentStatus: input[4].value
		
		}

	// console.log(newOrder)

		dbRequest.createOrder(newOrder, () => {
			location.replace('index.html')
		})

	})


}

// Получить все заказы
// GET /orders

// Получить заказ по ID
// GET /order/:id

// Создать новый заказ
// POST /order body

// Изменить заказ
// PUT /order/:id body

// Удалить заказ
// DELETE /order/:id

// Сброс базы данных
// POST /reinit