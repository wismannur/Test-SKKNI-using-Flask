window.API = 'http://localhost:5000'

window.dataKeseluruhan = []
window.ddNoPeserta = []
window.ddNamaPeserta = []
window.alamatPeserta = []
window.emailPeserta = []
window.telpPeserta = []
window.ddNoSkema = []
window.ddNamaSkema = []
window.ddRuang = []
window.nilai_p = []
window.nilai_i = []
window.nilai_t = []
window.filterHasil = ["Kompeten", "Belum Kompeten"]

$(document).ready(function(){
    isiTabelPeserta()
    function isiTabelPeserta() {
        $.ajax({
            url : window.API + '/get_peserta',
            type: 'GET',
            success: function(data) {
                window.dataPeserta = JSON.parse(data)
                for (let i = 0; i < dataPeserta.length; i++) {
                    ddNoPeserta.splice(i, 0, String(dataPeserta[i].no_peserta))
                    ddNamaPeserta.splice(i, 0, String(dataPeserta[i].nama))
                    alamatPeserta.splice(i, 0, String(dataPeserta[i].alamat))
                    emailPeserta.splice(i, 0, String(dataPeserta[i].email))
                    telpPeserta.splice(i, 0, String(dataPeserta[i].telp))
                }
                // console.log(dataPeserta)
                // console.log(dataKeseluruhan)
            },
            complete: function() {
                var temp = dataPeserta.length;
                for (let i = 0; i < temp; i++) {
                    var editDelete = `<button class="btn btn-warning edit-peserta" data-toggle="modal" data-target="#modalEditPeserta" onClick="$(this).modalEditPeserta(\'${ddNoPeserta[i]}\', \'${ddNamaPeserta[i]}\', \'${alamatPeserta[i]}\', \'${emailPeserta[i]}\', \'${telpPeserta[i]}\', )"><i class="fa fa-edit"></i></button> 
                    <button class="btn btn-danger hapus-peserta" data-toggle="modal" data-target="#modalHapusPeserta" onClick="$(this).modalHapusPeserta(\'${ddNoPeserta[i]}\', \'${ddNamaPeserta[i]}\')"><i class="fa fa-trash"></i></button>`
                    $('#tablePeserta').append(`<tr class=\'data-tabel-peserta\'><td>`+ ddNoPeserta[i] +` </td><td>`+ ddNamaPeserta[i] +`</td><td>`+ alamatPeserta[i] +`</td><td>`+ emailPeserta[i] +`</td><td>`+ telpPeserta[i] +`</td><td>`+ editDelete +`</td></tr>`)
                }

            }
        })
    }

    isiTabelSkema()
    function isiTabelSkema() {
        $.ajax({
            url : window.API + '/get_skema',
            type: 'GET',
            success: function(data) {
                window.dataSkema = JSON.parse(data)
                for (let i = 0; i < dataSkema.length; i++) {
                    ddNoSkema.splice(i, 0, String(dataSkema[i].no_skema))
                    ddNamaSkema.splice(i, 0, String(dataSkema[i].nama_skema))
                    ddRuang.splice(i, 0, String(dataSkema[i].ruang))
                }
                // console.log(dataSkema)
                // console.log(dataKeseluruhan.reverse())
            },
            complete: function(){
                var temp = dataSkema.length;
                for (let i = 0; i < temp; i++) {
                    var editDelete = `<button class="btn btn-warning edit-skema" data-toggle="modal" data-target="#modalEditSkema" onClick="$(this).modalEditSkema(\'${ddNoSkema[i]}\', \'${ddNamaSkema[i]}\', \'${ddRuang[i]}\' )"><i class="fa fa-edit"></i></button> 
                    <button class="btn btn-danger hapus-skema" data-toggle="modal" data-target="#modalHapusSkema" onClick="$(this).modalHapusSkema(\'${ddNoSkema[i]}\', \'${ddNamaSkema[i]}\')"><i class="fa fa-trash"></i></button>`
                    $('#tableSkema').append(`<tr class=\'data-tabel-skema\'><td>`+ ddNoSkema[i] +` </td><td>`+ ddNamaSkema[i] +`</td><td>`+ ddRuang[i] +`</td><td>`+ editDelete +`</td></tr>`)
                }
            }
        })
    }

    $.fn.modalHapusSkema = function(id, namaSkema) {
        window.id = id
        window.namaSkema = namaSkema

        $('.modal-nama-skema').remove()
        $('.modal-body-hapus-skema').append(`<h5 class=\'modal-nama-skema\'>Nama Skema : \'${namaSkema}\'</h5>`)

        console.log(id, namaSkema)
    }

    $.fn.modalEditSkema = function(id, namaSkema, ruangSkema) {
        window.id = id
        window.namaSkema = namaSkema
        window.ruangSkema = ruangSkema

        $('#no-skema-edit').val(id)
        $('#nama-skema-edit').val(namaSkema)
        $('#ruang-skema-edit').val(ruangSkema)
    }

    $.fn.editSkema = function() {
        $.ajax({
            url : window.API + '/update_skema',
            type: 'PUT',
            data: {
                'no_skema' : id,
                'nama_skema' : $('#nama-skema-edit').val(),
                'ruang' : $('#ruang-skema-edit').val()
            },
            success: function(data) {
                alert(data)
                $('.data-tabel-skema').remove()
                isiTabelSkema()
            }
        })
    }

    $.fn.hapusSkema = function() {
        $.ajax({
            url : window.API + '/delete_skema',
            type: 'PUT',
            data : {
                'no_skema' : id
            },
            success: function(data) {
                alert(data)
                $('.data-tabel-skema').remove()
                isiTabelSkema()
            }
        })
    }

    $.fn.modalHapusPeserta = function(id, namaPeserta) {
        window.id = id
        window.namaPeserta = namaPeserta

        $('.modal-nama-peserta').remove()
        $('.modal-body-hapus-peserta').append(`<h5 class=\'modal-nama-peserta\'>Nama Peserta : \'${namaPeserta}\'</h5>`)
    }

    $.fn.modalEditPeserta = function(id, nama_peserta, alamat_peserta, email_peserta, telp_peserta) {
        window.id = id
        window.nama_peserta = nama_peserta
        window.alamat_peserta = alamat_peserta
        window.email_peserta = email_peserta
        window.telp_peserta = telp_peserta

        $('#no-peserta-edit').val(id)
        $('#nama-peserta-edit').val(nama_peserta)
        $('#alamat-peserta-edit').val(alamat_peserta)
        $('#email-peserta-edit').val(email_peserta)
        $('#telp-peserta-edit').val(telp_peserta)
    }

    $.fn.editPeserta = function() {
        $.ajax({
            url : window.API + '/update_peserta',
            type: 'PUT',
            data : {
                'no_peserta' : id,
                'nama' : $('#nama-peserta-edit').val(),
                'alamat' : $('#alamat-peserta-edit').val(),
                'email' : $('#email-peserta-edit').val(),
                'telp' : $('#telp-peserta-edit').val()
            },
            success: function(data) {
                alert(data)
                $('.data-tabel-peserta').remove()
                isiTabelPeserta()
            }
        })
    }

    $.fn.hapusPeserta = function() {
        $.ajax({
            url : window.API + '/delete_peserta',
            type: 'PUT',
            data : {
                'no_peserta' : id
            },
            success: function(data) {
                alert(data)
                $('.data-tabel-peserta').remove()
                isiTabelPeserta()
            }
        })
    }

    ambilNilai()
    function ambilNilai() {
        $.ajax({
            url : window.API + '/get_nilai',
            type: 'GET',
            success: function(data) {
                var dataNilai = JSON.parse(data)
                dataKeseluruhan = dataNilai
                for (let i = 0; i < dataNilai.length; i++) {
                    nilai_p.splice(i, 0, String(dataNilai[i].nilai_p))
                    nilai_i.splice(i, 0, String(dataNilai[i].nilai_i))
                    nilai_t.splice(i, 0, String(dataNilai[i].nilai_t))
                }
                // console.log(dataNilai)
                // console.log(dataKeseluruhan.reverse())
            },
            complete: function() {
                var tugas = 'semua'
                masukanData(tugas)
                isiDropdown()
            }
        })
    }

    $('#btn-filter-hasil').on('click', function() {
        var isi = $('#filter-hasil').val()
        var K = 'K'
        var BK = 'BK'
        if (isi == 'Kompeten') {
            masukanData(K)
        } else {
            masukanData(BK)
        }
    })

    $('#btn-filter-skema').on('click', function() {
        var isi = $('#ddSkema-hasil').val()
        masukanData(isi)
    })

    $.fn.modalEditHasil = function(id, nomorPeserta, namaPeserta, namaSkema, nilai_p, nilai_i, nilai_t) {
        window.id = id
        window.nomorPeserta = nomorPeserta
        window.namaPeserta = namaPeserta
        window.namaSkema = namaSkema
        window.nilai_p = nilai_p
        window.nilai_i = nilai_i
        window.nilai_t = nilai_t

        // console.log(id, nomorPeserta, namaPeserta, namaSkema, nilai_p, nilai_i, nilai_t )

        $('#noPeserta-edit').val(nomorPeserta)
        $('#namaPeserta-edit').val(namaPeserta)
        $('#namaSkema-edit').val(namaSkema)
        $('#nilai_p_edit').val(nilai_p)
        $('#nilai_i_edit').val(nilai_i)
        $('#nilai_t_edit').val(nilai_t)
    }

    $.fn.editHasil = function() {
        $.ajax({
            url : window.API + '/update_nilai',
            type: 'PUT',
            data: {
                'id_hasil' : id,
                'nilai_p' : $('#nilai_p_edit').val(),
                'nilai_i' : $('#nilai_i_edit').val(),
                'nilai_t' : $('#nilai_t_edit').val()
            },
            success: function(data) {
                console.log(data)
                alert(data)
                ambilNilai()
            }
        })
    }

    $.fn.modalHapusHasil = function(id, nomorPeserta, namaPeserta) {
        window.id = id
        window.nomorPeserta =  nomorPeserta
        window.namaPeserta = namaPeserta

        $('.modal-nama-peserta').remove()
        $('.modal-body-hapus-hasil').append(`<h5 class=\'modal-nama-peserta\'>Nama Peserta : \'${namaPeserta}\'</h5>`)

        console.log(id, nomorPeserta, namaPeserta)
    }

    $.fn.hapusHasil = function() {
        $.ajax({
            url : window.API + '/delete_nilai',
            type: 'PUT',
            data : {
                'id_hasil' : id
            },
            success: function(data) {
                alert(data)
            },
        })

        $.ajax({
            url : window.API + '/delete_peserta',
            type: 'PUT',
            data : {
                'no_peserta' : nomorPeserta
            },
            success: function(data) {
                alert(data)
            },
            complete: function() {
                ambilNilai()
            }
        })
    }

    function masukanData(tugas) {
        $('.data-tabel').remove()
        var temp = dataKeseluruhan.length;

        for (let j = 0; j < temp; j++) {
            for (let i = 0; i < temp; i++) {
                if(dataKeseluruhan[j].no_peserta == ddNoPeserta[i]) {
                    // console.log(dataKeseluruhan[j].no_peserta, ddNoPeserta[i], ddNamaPeserta[i])
                    var namaPeserta = ddNamaPeserta[i]
                    var nomorPeserta = ddNoPeserta[i]
                }

                if(dataKeseluruhan[j].no_skema == ddNoSkema[i]) {
                    // console.log(dataKeseluruhan[j].no_skema, ddNoSkema[i], ddNamaSkema[i])
                    var namaSkema = ddNamaSkema[i]
                    var ruangSkema = ddRuang[i]

                    if (dataKeseluruhan[j].nilai_p >= 60 && dataKeseluruhan[j].nilai_i >= 60 && dataKeseluruhan[j].nilai_t >= 60) {
                        var ket = 'K'
                        var keterangan = 'Kompeten'
                    } else if (dataKeseluruhan[j].nilai_p >= 60 && dataKeseluruhan[j].nilai_i >= 60) {
                        var ket = 'K'
                        var keterangan = 'Kompeten'
                    } else if (dataKeseluruhan[j].nilai_p >= 60 && dataKeseluruhan[j].nilai_t >= 60) {
                        var ket = 'K'
                        var keterangan = 'Kompeten'
                    } else if (dataKeseluruhan[j].nilai_i >= 60 && dataKeseluruhan[j].nilai_t >= 60) {
                        var ket = 'K'
                        var keterangan = 'Kompeten'
                    } else {
                        var ket = 'BK'
                        var keterangan = 'Belum Kompeten'
                    }
                }
            }

            var editDelete = `<button class="btn btn-warning edit-hasil" data-toggle="modal" data-target="#modalEditHasil" onClick="$(this).modalEditHasil(\'${dataKeseluruhan[j].id_hasil}\', \'${nomorPeserta}\', \'${namaPeserta}\', \'${namaSkema}\', \'${dataKeseluruhan[j].nilai_p}\', \'${dataKeseluruhan[j].nilai_i}\', \'${dataKeseluruhan[j].nilai_t}\')"><i class="fa fa-edit"></i></button> 
                <button class="btn btn-danger hapus-hasil" data-toggle="modal" data-target="#modalHapusHasil" onClick="$(this).modalHapusHasil(\'${dataKeseluruhan[j].id_hasil}\', \'${nomorPeserta}\', \'${namaPeserta}\')"><i class="fa fa-trash"></i></button>`
            if( tugas == 'semua') {
                $('#table-hasil').append(`<tr class=\'data-tabel\'><td>`+ nomorPeserta +` </td><td>`+ namaPeserta +`</td><td>`+ namaSkema +`</td><td>`+ ruangSkema +`</td><td>`+ dataKeseluruhan[j].nilai_p +`</td><td>`+ dataKeseluruhan[j].nilai_i +`</td><td>`+ dataKeseluruhan[j].nilai_t +`</td><td>`+ ket +`</td><td>`+ keterangan +`</td><td>`+ editDelete +`</td></tr>`)
            } else if ( tugas == 'K') {
                if (ket == 'K') {
                    $('#table-hasil').append(`<tr class=\'data-tabel\'><td>`+ nomorPeserta +` </td><td>`+ namaPeserta +`</td><td>`+ namaSkema +`</td><td>`+ ruangSkema +`</td><td>`+ dataKeseluruhan[j].nilai_p +`</td><td>`+ dataKeseluruhan[j].nilai_i +`</td><td>`+ dataKeseluruhan[j].nilai_t +`</td><td>`+ ket +`</td><td>`+ keterangan +`</td><td>`+ editDelete +`</td></tr>`)
                }
            } else if (tugas == 'BK') {
                if (ket == 'BK') {
                    $('#table-hasil').append(`<tr class=\'data-tabel\'><td>`+ nomorPeserta +` </td><td>`+ namaPeserta +`</td><td>`+ namaSkema +`</td><td>`+ ruangSkema +`</td><td>`+ dataKeseluruhan[j].nilai_p +`</td><td>`+ dataKeseluruhan[j].nilai_i +`</td><td>`+ dataKeseluruhan[j].nilai_t +`</td><td>`+ ket +`</td><td>`+ keterangan +`</td><td>`+ editDelete +`</td></tr>`)
                }
            } else if (tugas == namaSkema) {
                $('#table-hasil').append(`<tr class=\'data-tabel\'><td>`+ nomorPeserta +` </td><td>`+ namaPeserta +`</td><td>`+ namaSkema +`</td><td>`+ ruangSkema +`</td><td>`+ dataKeseluruhan[j].nilai_p +`</td><td>`+ dataKeseluruhan[j].nilai_i +`</td><td>`+ dataKeseluruhan[j].nilai_t +`</td><td>`+ ket +`</td><td>`+ keterangan +`</td><td>`+ editDelete +`</td></tr>`)
            }
        }
    }

    function isiDropdown() {
        $('.autocomplete-items').remove()
        autocomplete(document.getElementById("ddPeserta-nilai"), ddNamaPeserta);
        autocomplete(document.getElementById("ddSkema-nilai"), ddNamaSkema);
        autocomplete(document.getElementById("ddSkema-hasil"), ddNamaSkema);
        autocomplete(document.getElementById("filter-hasil"), filterHasil);
    }

    $('#refresh-table').click(function() {
        console.log('refresh table')
        ambilNilai()
    })

    $('#submitPeserta').click(function() {
        var nama = $('#nama').val()
        var alamat = $('#alamat').val()
        var email = $('#email').val()
        var telp = $('#telp').val()

        $.ajax({
            url : window.API + '/create_peserta',
            type: 'POST',
            data : {
                'nama' : nama,
                'alamat' : alamat,
                'email' : email,
                'telp' : telp
            },
            success: function(data) {
                alert(data)
                $('.data-tabel-peserta').remove()
                isiTabelPeserta()
            }
        })
    })

    $('#submitSkema').click(function() {
        var nama_skema = $('#nama-skema').val()
        var ruang = $('#ruang').val()

        $.ajax({
            url : window.API + '/create_skema',
            type: 'POST',
            data: {
                'nama_skema' : nama_skema,
                'ruang' : ruang
            },
            success: function(data) {
                alert(data)
                $('.data-tabel-skema').remove()
                isiTabelSkema()
            }
        })
    })

    $('#submitNilai').click(function() {
        var namaPeserta = $('#ddPeserta-nilai').val()
        var namaSkema = $('#ddSkema-nilai').val()
        for (var i = 0; i < ddNamaPeserta.length; i++) {
            if(namaPeserta == ddNamaPeserta[i]) {
                var noPeserta = ddNoPeserta[i]
                console.log('ini no peserta = ', noPeserta)
            }
        }

        for (let j = 0; j < ddNoSkema.length; j++) {
            if(namaSkema == ddNamaSkema[j]) {
                var noSkema = ddNoSkema[j]
                console.log('ini no skema = ', noSkema)
            }
        }
        
        $.ajax({
            url : window.API + '/create_nilai',
            type: 'POST',
            data: {
                'no_peserta' : noPeserta,
                'no_skema' : noSkema,
                'nilai_p' : $('#nilai_p').val(),
                'nilai_i' : $('#nilai_i').val(),
                'nilai_t' : $('#nilai_t').val()
            },
            success: function(data) {
                console.log(data)
                alert(data)
            }
        })
    })

})

