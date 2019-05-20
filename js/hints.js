import dbRequest from './request.js'
main()

function main () {
	const reinit = document.getElementById("reinit-btn")
		reinit.addEventListener('click', function(event) {
			event.stopPropagation()
			dbRequest.reinit(() => {
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