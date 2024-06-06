# Generated by Django 3.2.25 on 2024-05-28 22:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20240528_1737'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ordenpedido',
            name='fecha',
        ),
        migrations.AddField(
            model_name='ordenpedido',
            name='fecha_esperada',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='ordenpedido',
            name='fecha_generacion',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]
