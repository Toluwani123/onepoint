# Generated by Django 4.1.6 on 2023-04-05 22:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0008_alter_cart_customer"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cart",
            name="customer",
            field=models.OneToOneField(
                blank=True,
                max_length=50,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="api.customer",
            ),
        ),
    ]