import dbRequest from './request.js'

 const trElementTemplate = `
<tr class="bid-row">
	<td scope="row">
		<a href="edit.html?id=%ID%">Заявка №%ID%</a>
	</td>
	<td>%CLIENT_NAME%</td>
	<td>
		<span class="badge badge-light badge-lg">
			%GOOD%
		</span>
	</td>
	<td>%PRICE%</td>
	<td><span class="badge %CLASSSTAT%">%REQUESTSTATUS%</span></td>
	<td><span class="badge %CLASSPAY%">%PAYMENTSTATUS%</span></td>
</tr>` 

main() 

function main () {

	const originalData = []

	const input = document.forms.filterForm.elements

  	dbRequest.getList(data => {
  		const dataSave = data
		const rootDir = document.getElementById('listViewer')

		const goods = updateOriginalData(data)
		getListOrders(data)

	   const input = document.forms.filterForm.elements

	   for ( let j=0; j<input.length; j++ ) {
		   input[j].addEventListener('change', function(event) {
		   	event.stopPropagation()

			if (j === 0) {
					if(input[0].value == 0) {
						data = dataSave
					} else {
						data = data.filter(item => item.requestStatus===input[0].value)
					}
				}
				  
				if (j === 1) {
					if(input[1].value == 0) {
						data = dataSave
					} else {
					data = data.filter(item => item.paymentStatus===input[1].value)
					}
				}

				if (j === 2) {
					if(input[2].value == 0) {
						data = dataSave
					} else {
					data = data.filter(item => item.good===goods[input[2].value])
					}

				}

				const rootDir = document.getElementById('listViewer')
				rootDir.innerHTML = ''
				getListOrders(data)
			})
		}
	})
}

function getListOrders (data) {

	const rootDir = document.getElementById('listViewer')
	for (const item of data) {
		const tbodyElement = document.createElement('tbody')

		let paymentStatusText = ''
		let classText = ''
		let classTextPay = ''
		switch(item.paymentStatus) {
			case "1":
			paymentStatusText = 'Не оплачено'
			classTextPay = 'badge-secondary'
			break
			case "3":
			paymentStatusText = 'Частичная оплата'
			classTextPay = 'badge-warning'
			break
			case "4":
			paymentStatusText = 'Полная оплата'
			classTextPay = 'badge-success'
			break
			case "5":
			paymentStatusText = 'Возврат'
			classTextPay = 'badge-dark'
			break

			default:
			paymentStatusText = 'Не оплачено'
			classTextPay = 'badge-secondary'

		}

		let requestStatusText = ''
		switch(item.requestStatus) {
			case "1":
			requestStatusText = 'Новая'
			classText = 'badge-primary'
			break
			case "2":
			requestStatusText = 'В работе'
			classText = 'badge-light'
			break
			case "3":
			requestStatusText = 'Ожидается оплата'
			classText = 'badge-warning'
			break
			case "4":
			requestStatusText = 'Завершена'
			classText = 'badge-success'
			break
			case "5":
			requestStatusText = 'Отказ'
			classText = 'badge-secondary'
			break

			default:
			requestStatusText = 'Новая'
			classText = 'badge-primary'

		}

	    let price = item.price.toString()
		price = price.slice(0,-2) + '.' + price.slice(-2) + ' руб.'
		tbodyElement.innerHTML = trElementTemplate
			.replace('%ID%', item.id)
			.replace('%ID%', item.id)
			.replace('%GOOD%', item.good)
			.replace('%PRICE%', price)
			.replace('%CLIENT_NAME%', item.clientName)
			.replace('%REQUESTSTATUS%', requestStatusText)
			.replace('%PAYMENTSTATUS%', paymentStatusText)
			.replace('%CLASSSTAT%', classText)
			.replace('%CLASSPAY%', classTextPay)

		rootDir.append(tbodyElement.firstElementChild)
	}

}

	function updateOriginalData (data) {
					// Массив всех товаров на сервере
	const originalData = []

	// Массив наименований всех товаров
	const goods = []
		originalData.splice(0)
		originalData.push(...data)

		goods.splice(0)
		goods.push('Выберите...', ...new Set(data.map(i => i.good)))

		// Переформирование фильтр-бара по массиву наименования всех товаров.
		const goodsSortbar = document.querySelector('[data-sortbar-goods]')
		goodsSortbar.innerHTML = ''

		for (let i = 0; i < goods.length; i++) {
			const optionElement = document.createElement('option')

			optionElement.setAttribute('value', i)
			optionElement.textContent = goods[i]

			goodsSortbar.append(optionElement)
		}
		return goods
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