import dbRequest from './request.js'

const trElementTemplate = `
	<div class="row mb-3">
		<div class="col-md-2"><strong>ID:</strong></div>
			<div class="col"> Заявка № %ID% </div>
	</div>
	<div class="row mb-3">
		<div class="col-md-2"><strong>Имя клиента:</strong></div>
		<div class="col">
			<input type="text" class="form-control" value="%CLIENT_NAME%">
		</div>
	</div>

	<div class="row mb-3">
		<div class="col-md-2"><strong>Продукт:</strong></div>
		<div class="col">
			<span class="badge badge-light badge-lg">
				%GOOD%
			</span>
		</div>
	</div>

	<div class="row mb-3">
		<div class="col-md-2"><strong>Стоимость:</strong></div>
		<div class="col">
			<div class="input-group">
			  <input type="text" class="form-control" value="%PRICE%">
			  <div class="input-group-append">
				    <span class="input-group-text">рублей</span>
			  </div>
			</div>
		</div>
	</div>

	<div class="row mb-3">
		<div class="col-md-2">
			<strong>Статус заявки:</strong> 
		</div>
		<div class="col">
			<select class="custom-select" id="inputGroupSelect01">
				<option selected="">Выберите...</option>
				<option value="1" %Z1%>Новая</option>
				<option value="2" %Z2%>В работе</option>
				<option value="3" %Z3%>Ожидается оплата</option>
				<option value="4" %Z4%>Завершена</option>
				<option value="5" %Z5%>Отказ</option>
			</select>
		</div>
	</div>
	<div class="row mb-3">
		<div class="col-md-2">
			<strong>Статус оплаты:</strong> 
		</div>
		<div class="col">
			<select class="custom-select" id="inputGroupSelect02">
				<option selected="">Выберите...</option>
				<option value="1" %O1%>Не оплачено</option>
				<option value="3" %O3%>Частичная оплата</option>
				<option value="4" %O4%>Полная оплата</option>
				<option value="5" %O5%>Возврат</option>
			</select>
		</div>
	</div>

	<div class="row mb-3">
		<div class="col-md-2"><strong>Дата создания:</strong></div>
		<div class="col"> 2019-04-23 13:52:13 </div>
	</div>`
 
main()

function main () {
	const url = 'http://89.108.64.67:3000'
	const key = '?key=adjf989f89981045789sdf'
	let urlget = window.location.search
	let urlget2 = urlget.search('=') + 1
	urlget = urlget.slice(urlget2)

	const address = `/order/${urlget}`

	let dataSave
	
	dbRequest.getOrderById(address, data => {
		const rootDir = document.getElementById('listViewer')
		dataSave = data
		let item = data

		const tbodyElement = document.createElement('div')

		let price = item.price.toString()
		price = price.slice(0,-2) + '.' + price.slice(-2)

				tbodyElement.innerHTML = trElementTemplate
					.replace('%ID%', item.id)
					.replace('%GOOD%', item.good)
					.replace('%PRICE%', price)
					.replace('%CLIENT_NAME%', item.clientName)
					.replace(`%Z${item.requestStatus}%`, 'selected')
					.replace(`%O${item.paymentStatus}%`, 'selected')

				rootDir.appendChild(tbodyElement)

		})
		const buttons = document.querySelectorAll('button')

		buttons[0].addEventListener('click', function(event) {
			event.stopPropagation()

			const input = document.forms.firstForm.elements

		    let priceCop = input[1].value.replace('.', '')	
		    if(priceCop === input[1].value) {
		    	priceCop +='00'
		    }

			const editOrder = {
				id: dataSave.id,
				good: dataSave.good,
				price: priceCop,
				clientName: input[0].value,
				managerName: dataSave.managerName,
				requestStatus: input[2].value,
				paymentStatus: input[3].value
			
			} 

		//	console.log(editOrder)

			const address = `/order/${urlget}`
		//	console.log(address)
			dbRequest.editOrderById(address, editOrder, data => {

		//			console.log(data)
			location.replace('index.html')
				})

		})

		buttons[1].addEventListener('click', function(event) {
			event.stopPropagation()
			dbRequest.deleteOrderById(address, () => {

		//			console.log(data)
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